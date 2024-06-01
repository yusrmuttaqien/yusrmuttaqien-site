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
  const threshold = navbarMBottom + navbarMTop - navbarHeight;

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLElement;

    function _setStyle(overContent: boolean) {
      if (overContent && !root.classList.contains('mix-blend-difference')) {
        root.classList.add('mix-blend-difference');
        root.classList.remove('text-dynamic-grey');
      } else if (!overContent && root.classList.contains('mix-blend-difference')) {
        root.classList.remove('mix-blend-difference');
        root.classList.add('text-dynamic-grey');
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
