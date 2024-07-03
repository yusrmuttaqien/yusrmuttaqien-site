import type { MotionProps } from 'framer-motion';

// NOTE: List of page identifiers from meta tags
export const MANUAL_ENABLE_SCROLL = ['index'];
export const VARIANT: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
