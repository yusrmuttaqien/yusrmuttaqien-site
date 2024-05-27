import { useMotionValue, motion } from 'framer-motion';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useMediaQueryStore } from '@/contexts/mediaQuery';
import classMerge from '@/utils/classMerge';
import type { CursorProps } from '@/components/Cursor/type';

export default function Cursor(props: CursorProps) {
  const { className } = props;
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

  return (
    <motion.div
      id="cursor"
      style={{ x, y, opacity }}
      className={classMerge(
        'w-4 h-4 rounded-full fixed top-[calc(50%_-_0.5rem)] -translate-x-1/2 -translate-y-1/2',
        'border-4 border-beige pointer-events-none left-[calc(50%_-_0.30rem_-_var(--pad-scrollbar)_/_2)]',
        'mix-blend-difference origin-center transition-[transform_opacity] ease-linear duration-[50ms]',
        className
      )}
    />
  );
}
