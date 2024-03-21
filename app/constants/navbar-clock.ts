import { MotionProps } from 'framer-motion';

export const numVariant: MotionProps = {
  variants: {
    initial: { opacity: 0, y: '-30%' },
    visible: { opacity: 1, y: '0%' },
    hidden: { opacity: 0, y: '30%' },
  },
  initial: 'initial',
  animate: 'visible',
  exit: 'hidden',
};

export const colVariant: MotionProps = {
  variants: {
    visible: { opacity: 0 },
    hidden: { opacity: 1 },
  },
  animate: 'visible',
  exit: 'hidden',
};
