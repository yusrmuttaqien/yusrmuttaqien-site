import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import debounce from '@/utils/debounce';

export default function useHomeMasteriesCalculate() {
  const rAF = useRef<number>(0);
  const scope = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const debouncedCalculate = debounce(_calculate, 100);

    function _calculate() {
      rAF.current = requestAnimationFrame(() => {
        const root = scope.current as HTMLElement;

        if (!root) return cancelAnimationFrame(rAF.current);
        const { marginTop, marginBottom, marginLeft, height, width } = getComputedStyle(
          root.children.item(0) as HTMLElement
        );
        const totalHeight = parseFloat(height) + parseFloat(marginTop) + parseFloat(marginBottom);
        const totalWidth = parseFloat(width) + parseFloat(marginLeft) * 2;

        root.style.setProperty('--margin-block', marginLeft);
        root.style.setProperty('--margin-top', marginTop);
        root.style.setProperty('--margin-bottom', marginBottom);
        root.style.setProperty('--height', `${totalHeight}px`);
        root.style.setProperty('--width', `${totalWidth}px`);
      });
    }

    window.addEventListener('resize', debouncedCalculate);
    _calculate();

    return () => {
      window.removeEventListener('resize', debouncedCalculate);
    };
  }, []);

  return { scope };
}
