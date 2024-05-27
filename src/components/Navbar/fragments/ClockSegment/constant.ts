import type { MotionProps } from 'framer-motion';

export const VARIANT: MotionProps = {
  initial: { opacity: 0, y: '-40%' },
  animate: { opacity: 1, y: '0%' },
  exit: { opacity: 0, y: '10%' },
};
