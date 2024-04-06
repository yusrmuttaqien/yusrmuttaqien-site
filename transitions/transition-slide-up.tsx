import { motion, type HTMLMotionProps, type MotionProps } from 'framer-motion';
import classMerge from '@/utils/class-merge';

export const VARIANT: MotionProps = {
  variants: {
    initial: { opacity: 0, y: '-30%' },
    visible: { opacity: 1, y: '0%' },
    hidden: { opacity: 0, y: '30%' },
  },
  initial: 'initial',
  animate: 'visible',
  exit: 'hidden',
};

export default function TransitionSlideUp({
  children,
  className,
  ...rest
}: HTMLMotionProps<'main'>) {
  return (
    <motion.main {...VARIANT} className={classMerge('relative', className)} {...rest}>
      {children}
    </motion.main>
  );
}
