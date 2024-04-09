import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import debounce from '@/utils/debounce';

export default function useHomeMasteriesCalculate() {
  const scope = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const debouncedCalculate = debounce(calculate, 100);

    function calculate() {
      requestAnimationFrame(() => {
        const root = scope.current as HTMLElement;
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
    calculate();

    return () => {
      window.removeEventListener('resize', debouncedCalculate);
    };
  }, []);

  return scope;
}
