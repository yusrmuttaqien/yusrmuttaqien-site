import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useMeasuresStore } from '@/contexts/measures';
import debounce from '@/utils/debounce';

export default function useMeasure() {
  const scope = useRef<HTMLElement>(null);
  const cooldownTimeout = useRef<NodeJS.Timeout | number>(0);
  const noteNavbar = useMeasuresStore((state) => state.noteNavbar);

  useIsomorphicLayoutEffect(() => {
    const debouncedMeasure = debounce(_measure, 100);

    function _measure() {
      requestAnimationFrame(() => {
        let numbers = {
          height: 0,
          top: 0,
          marginTop: 0,
          marginBottom: 0,
        };

        try {
          const root = scope.current as HTMLElement;
          const height = root.offsetHeight;
          const html = document.documentElement;
          const { top, marginTop, marginBottom } = getComputedStyle(root);
          numbers.height = height;
          numbers.top = parseInt(top);
          numbers.marginTop = parseInt(marginTop);
          numbers.marginBottom = parseInt(marginBottom);

          html.style.setProperty(
            '--navbar-docked-total-height',
            `${height + numbers.marginTop + numbers.marginBottom}px`
          );
          html.style.setProperty(
            '--navbar-docked-minimal-height',
            `${numbers.top + numbers.height}px`
          );
        } catch (e) {
          console.log(e);
        } finally {
          if (Object.values(numbers).some((v) => isNaN(v) || v === 0)) {
            cooldownTimeout.current = setTimeout(_measure, 800);
          } else {
            noteNavbar(numbers);
          }
        }
      });
    }

    window.addEventListener('resize', debouncedMeasure);
    _measure();

    return () => {
      window.removeEventListener('resize', debouncedMeasure);
      clearTimeout(cooldownTimeout.current);
    };
  }, []);

  return { scope };
}
