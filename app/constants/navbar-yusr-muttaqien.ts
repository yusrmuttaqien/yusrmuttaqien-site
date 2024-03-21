import { MotionProps } from 'framer-motion';

export const nameVariant: MotionProps = {
  variants: {
    initial: { opacity: 0, y: '-10%' },
    visible: { opacity: 1, y: '0%' },
    hidden: { opacity: 0 },
  },
  initial: 'initial',
  animate: 'visible',
  exit: 'hidden',
};
