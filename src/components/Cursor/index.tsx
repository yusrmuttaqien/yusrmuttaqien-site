// TODO: Either hid on load and show on mousemove or show loader when loading
import { motion } from 'framer-motion';
import useInteractive from '@/components/Cursor/hooks/interactive';
import classMerge from '@/utils/classMerge';
import type { CursorProps } from '@/components/Cursor/type';

export default function Cursor(props: CursorProps) {
  const { className } = props;
  const { x, y, opacity, isHoverable } = useInteractive();

  return (
    <motion.div
      id="cursor"
      style={{ x, y, opacity }}
      className={classMerge(
        'w-4 h-4 rounded-full fixed top-[calc(50%_-_0.5rem)] -translate-x-1/2 -translate-y-1/2',
        'border-4 border-beige pointer-events-none left-[calc(50%_-_0.5rem)]',
        'mix-blend-difference origin-center',
        !isHoverable && 'invisible',
        className
      )}
    />
  );
}
