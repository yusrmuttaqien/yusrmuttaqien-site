import { MotionProps } from 'framer-motion';

export const bgVariant: MotionProps = {
  transition: { duration: 0.1 },
  variants: {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
  initial: 'initial',
  animate: 'visible',
  exit: 'hidden',
};
