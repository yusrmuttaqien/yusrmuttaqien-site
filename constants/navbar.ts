import type { MotionProps } from 'framer-motion';

export const MEASURE_NAVBAR_TRIES = 5;
export const VARIANT_CLOCK_NUM: MotionProps = {
  variants: {
    initial: { opacity: 0, y: '-30%' },
    visible: { opacity: 1, y: '0%' },
    hidden: { opacity: 0, y: '30%' },
  },
  initial: 'initial',
  animate: 'visible',
  exit: 'hidden',
};
