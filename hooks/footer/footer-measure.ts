import { useRef } from 'react';
import { useInView, useMotionValue } from 'framer-motion';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import debounce from '@/utils/debounce';

export default function useFooterMeasure() {
  const contactScope = useRef<HTMLDivElement>(null);
  const contentScope = useRef<HTMLDivElement>(null);
  const isInView = useInView(contactScope, { margin: '0% 0% 0% 0%' });
  const isInOrPastView = useMotionValue(false);

  useIsomorphicLayoutEffect(() => {
    const contentRoot = contentScope.current as HTMLElement;
    const debouncedMeasure = debounce(_measure, 100);

    function _measure() {
      requestAnimationFrame(() => {
        const { clientHeight: rootHeight } = document.documentElement;
        const { clientHeight } = contentRoot;

        if (clientHeight >= rootHeight) {
          contentRoot.classList.remove('sticky');
        } else {
          contentRoot.classList.add('sticky');
        }
      });
    }

    window.addEventListener('resize', debouncedMeasure);
    _measure();

    return () => {
      window.removeEventListener('resize', debouncedMeasure);
    };
  }, []);
  useIsomorphicLayoutEffect(() => {
    const contactRoot = contactScope.current as HTMLElement;

    function _topFold() {
      const { offsetTop, clientHeight } = contactRoot;
      const { scrollY, innerHeight } = window;

      return scrollY > offsetTop + clientHeight - innerHeight;
    }

    if (isInView) {
      isInOrPastView.set(true);
    } else if (!_topFold()) {
      isInOrPastView.set(false);
    }
  }, [isInView]);

  return {
    scope: {
      contactScope,
      contentScope,
    },
    isInView: isInOrPastView,
  };
}
