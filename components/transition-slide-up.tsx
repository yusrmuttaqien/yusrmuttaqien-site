import { motion, type HTMLMotionProps, type MotionProps } from 'framer-motion';

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

export default function TransitionSlideUp({ children, ...rest }: HTMLMotionProps<'main'>) {
  return (
    <motion.main {...VARIANT} {...rest}>
      {children}
    </motion.main>
  );
}
