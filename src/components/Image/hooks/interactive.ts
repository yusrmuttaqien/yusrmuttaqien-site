import { useRef } from 'react';
import {
  useScroll,
  useMotionValue,
  useTransform,
  useIsomorphicLayoutEffect,
  transform,
} from 'framer-motion';
import debounce from '@/utils/debounce';
import type { InteractiveParams } from '@/components/Image/type';

export default function useInteractive(props: InteractiveParams) {
  const { scale: scaleFactor } = props;
  const scope = useRef<HTMLDivElement>(null);
  const cacheValues = useMotionValue({ jsHeight: 0, cssHeight: 0, transform: 0 });
  const { scrollYProgress } = useScroll({
    target: scope,
    offset: ['0.2 0.8', '0.8 0.2'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [scaleFactor, scaleFactor]);
  const y = useTransform(() => {
    const { jsHeight, cssHeight } = cacheValues.get();
    const offset = (jsHeight - cssHeight) / 2 / scaleFactor;

    return transform(scrollYProgress.get(), [0, 1], [offset, -offset]);
  });

  useIsomorphicLayoutEffect(() => {
    if (scaleFactor <= 1) {
      y.set(0);
      scale.set(1);

      return;
    }
    const root = scope.current as HTMLElement;
    const debouncedCache = debounce(_cacheValues, 100);

    function _cacheValues() {
      requestAnimationFrame(() => {
        const image = root.querySelector('#wrapper') as HTMLDivElement;
        const { height: cssHeight, transform } = getComputedStyle(image);
        const { height: jsHeight } = image.getBoundingClientRect();

        cacheValues.set({
          jsHeight,
          cssHeight: parseFloat(cssHeight),
          transform: parseFloat(transform.split(',')[3]),
        });
      });
    }
    function _reset() {
      requestAnimationFrame(() => {
        const html = document.documentElement as HTMLElement;

        if (html.classList.contains('lenis-scrolling') || cacheValues.get().transform === 1) return;

        y.set(0);
        scale.set(1);
      });
    }

    root.addEventListener('mousemove', _reset);
    window.addEventListener('resize', debouncedCache);
    _cacheValues();

    return () => {
      window.removeEventListener('resize', debouncedCache);
      root.removeEventListener('mousemove', _reset);
    };
  }, [scaleFactor]);

  return { scope, y, scale };
}
