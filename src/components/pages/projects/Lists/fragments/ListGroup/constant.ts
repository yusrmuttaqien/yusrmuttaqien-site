import type { MotionProps } from 'framer-motion';

export const VARIANT = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 100 },
  transition: { duration: 0.2 },
} as MotionProps;
