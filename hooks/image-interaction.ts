import {
  useScroll,
  useMotionValue,
  transform as transformer,
  type MotionValue,
} from 'framer-motion';
import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';

export default function useImageInteraction(originalScale: number) {
  const target = useRef<HTMLImageElement>(null);
  const y = useMotionValue(0);
  const scale = useMotionValue(originalScale);
  const { scrollYProgress } = useScroll({
    target: target,
    offset: ['start end', 'end start'],
  });

  useIsomorphicLayoutEffect(() => {
    const image = target.current as HTMLElement;
    const bindedMouseMove = MouseMove.bind(null, image, { y, scale });
    const clearYProgress = scrollYProgress.on(
      'change',
      TrackScroll.bind(null, image, originalScale, { y, scale })
    );

    image.addEventListener('mousemove', bindedMouseMove);

    return () => {
      image.removeEventListener('mousemove', bindedMouseMove);
      clearYProgress();
    };
  }, []);

  return { target, y, scale };
}

function TrackScroll(
  image: HTMLElement,
  scaleFactor: number,
  motionValue: { y: MotionValue<number>; scale: MotionValue<number> },
  e: number
) {
  requestAnimationFrame(() => {
    const { height: cssHeight } = getComputedStyle(image);
    const { height: jsHeight } = image.getBoundingClientRect();
    const offset = (jsHeight - parseFloat(cssHeight)) / 2 / scaleFactor;
    const position = transformer(e, [0, 1], [offset, -offset]);

    motionValue.y.set(position);
    motionValue.scale.set(scaleFactor);
  });
}

function MouseMove(
  image: HTMLElement,
  motionValue: { y: MotionValue<number>; scale: MotionValue<number> }
) {
  requestAnimationFrame(() => {
    const html = document.documentElement as HTMLElement;
    const { transform } = getComputedStyle(image);
    const scaleFactor = parseFloat(transform.split(',')[3]);

    if (html.classList.contains('lenis-scrolling') || scaleFactor === 1) return;

    motionValue.y.set(0);
    motionValue.scale.set(1);
  });
}
