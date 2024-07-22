import type { MotionProps } from 'framer-motion';

export const VARIANTS: MotionProps = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.15 },
};
