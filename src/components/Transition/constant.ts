import type { MotionProps } from 'framer-motion';

// NOTE: List of page identifiers from meta tags who require manual enable scroll
export const MANUAL_ENABLE_SCROLL = ['index'];
export const TRANSITION_LOCK_ID = 'transition';
export const VARIANT: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
