import type { MotionProps } from 'framer-motion';

export const VARIANTS: MotionProps = {
  initial: { height: 0 },
  animate: { height: 'auto' },
  exit: { height: 0 },
  transition: { duration: 0.15 },
};
