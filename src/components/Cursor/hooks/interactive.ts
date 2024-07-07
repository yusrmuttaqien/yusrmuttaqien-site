import { useMotionValue } from 'framer-motion';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useMediaQueryStore } from '@/contexts/mediaQueries';

export default function useInteractive() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(1);
  const isHoverable = useMediaQueryStore((store) => store.isHoverable);

  useIsomorphicLayoutEffect(() => {
    function _trackMouse(e: MouseEvent) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const relativeX = e.clientX - centerX;
      const relativeY = e.clientY - centerY;

      x.set(relativeX);
      y.set(relativeY);
      opacity.get() === 0 && opacity.set(1);
    }
    function _hideCursor() {
      opacity.get() !== 0 && opacity.set(0);
    }

    isHoverable && window.addEventListener('mousemove', _trackMouse);
    window.addEventListener('resize', _hideCursor);

    return () => {
      window.removeEventListener('mousemove', _trackMouse);
      window.removeEventListener('resize', _hideCursor);
    };
  }, [isHoverable]);

  return { x, y, opacity, isHoverable };
}
