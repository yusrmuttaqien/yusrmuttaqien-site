import { useRef } from 'react';
import { useIsomorphicLayoutEffect, useScroll } from 'framer-motion';
import { useMeasuresStore } from '@/contexts/measures';

export default function useInteractive() {
  const scope = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const initialAdjustment = useRef(false);
  const { navbarMBottom, navbarMTop, navbarHeight } = useMeasuresStore((state) => ({
    navbarMTop: state.navbarMTop,
    navbarMBottom: state.navbarMBottom,
    navbarHeight: state.navbarHeight,
  }));
  const threshold = Math.abs(navbarMBottom + navbarMTop - navbarHeight);

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLElement;

    function _setStyle(overContent: boolean) {
      const availibility = root.querySelector('#availibility') as HTMLElement;
      const availibilityP = root.querySelector('#availibility p') as HTMLElement;

      if (overContent && !root.classList.contains('mix-blend-difference')) {
        root.classList.add('mix-blend-difference');
        root.classList.remove('text-dynamic-grey');
        availibility.classList.remove('bg-dynamic-green');
        availibility.classList.add('bg-beige');
        availibilityP.classList.add('text-grey');
      } else if (!overContent && root.classList.contains('mix-blend-difference')) {
        root.classList.remove('mix-blend-difference');
        root.classList.add('text-dynamic-grey');
        availibility.classList.add('bg-dynamic-green');
        availibility.classList.remove('bg-beige');
        availibilityP.classList.remove('text-grey');
      }
    }

    if (!initialAdjustment.current && threshold) {
      const scrollPos = scrollY.get();
      initialAdjustment.current = true;

      if (threshold <= scrollPos) {
        _setStyle(true);
      } else if (threshold > scrollPos) {
        _setStyle(false);
      }
    }

    scrollY.on('change', (v) => {
      const isOverlapContent = threshold <= v;

      _setStyle(isOverlapContent);
    });

    return () => {
      scrollY.clearListeners();
    };
  }, [threshold]);

  return { scope };
}
