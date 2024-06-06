import { useRef } from 'react';
import { useScroll, useTransform, useIsomorphicLayoutEffect } from 'framer-motion';
import debounce from '@/utils/debounce';

export default function useInteractive() {
  const scope = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scope, offset: ['start end', 'end'] });
  const filterBrightness = useTransform(
    scrollYProgress,
    [0.56, 1],
    ['brightness(0)', 'brightness(1)']
  );

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLDivElement;
    const footer = root.querySelector('footer') as HTMLElement;
    const debouncedToggleSticky = debounce(_toggleSticky, 100);

    function _toggleSticky() {
      requestAnimationFrame(() => {
        const { clientHeight } = footer;
        const { clientHeight: documentHeight } = document.documentElement;

        if (clientHeight >= documentHeight) {
          footer.classList.remove('sticky');
        } else {
          footer.classList.add('sticky');
        }
      });
    }

    window.addEventListener('resize', debouncedToggleSticky);
    _toggleSticky();

    return () => {
      window.removeEventListener('resize', debouncedToggleSticky);
    };
  }, []);

  return { scope, filterBrightness };
}
