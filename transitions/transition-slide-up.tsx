import { motion, type HTMLMotionProps, type MotionProps } from 'framer-motion';
import classMerge from '@/utils/class-merge';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';

export const VARIANT: MotionProps = {
  variants: {
    initial: { opacity: 0, y: -150 },
    visible: { opacity: 1, y: 0, transition: FRAMER_DEFAULT_TIMING },
    hidden: { opacity: 0, y: 150, transition: FRAMER_DEFAULT_TIMING },
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
