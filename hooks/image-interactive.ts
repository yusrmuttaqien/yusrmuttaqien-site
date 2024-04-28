import { useScroll, useMotionValue, useTransform, transform as transformer } from 'framer-motion';
import { useRef } from 'react';
import { useMediaQueryCtx } from '@/providers/media-query';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import debounce from '@/utils/debounce';
import type { InteractiveProps } from '@/types/image';

export default function useImageInteractive(props: InteractiveProps) {
  const { scale: originalScale } = props;
  const target = useRef<HTMLImageElement>(null);
  const { isHover } = useMediaQueryCtx();
  const { scrollYProgress } = useScroll({
    target: target,
    offset: ['start end', 'end start'],
  });
  const rootComputedValues = useMotionValue({ jsHeight: 0, cssHeight: 0, transform: 0 });
  const scale = useTransform(scrollYProgress, [0, 1], [originalScale, originalScale]);
  const y = useTransform(() => {
    const { jsHeight, cssHeight } = rootComputedValues.get();
    const offset = (jsHeight - cssHeight) / 2 / originalScale;

    return transformer(scrollYProgress.get(), [0, 1], [offset, -offset]);
  });

  useIsomorphicLayoutEffect(() => {
    if (!isHover || originalScale <= 1) {
      y.set(0);
      scale.set(1);

      return;
    }
    const root = target.current as HTMLElement;
    const debouncedMeasure = debounce(_measure, 100);

    function _measure() {
      requestAnimationFrame(() => {
        const { height: cssHeight, transform } = getComputedStyle(root);
        const { height: jsHeight } = root.getBoundingClientRect();

        rootComputedValues.set({
          jsHeight,
          cssHeight: parseFloat(cssHeight),
          transform: parseFloat(transform.split(',')[3]),
        });
      });
    }
    function _rootMouseMove() {
      requestAnimationFrame(() => {
        const html = document.documentElement as HTMLElement;

        if (
          html.classList.contains('lenis-scrolling') ||
          rootComputedValues.get().transform === 1
        ) {
          return;
        }

        y.set(0);
        scale.set(1);
      });
    }

    root.addEventListener('mousemove', _rootMouseMove);
    window.addEventListener('resize', debouncedMeasure);
    _measure();

    return () => {
      root.removeEventListener('mousemove', _rootMouseMove);
      window.removeEventListener('resize', debouncedMeasure);
    };
  }, [isHover, originalScale]);

  return { target, y, scale };
}
