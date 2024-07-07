import type { MotionProps } from 'framer-motion';

export const VARIANT: MotionProps = {
  initial: { opacity: 0, y: '-80%', filter: 'blur(3px)', z: '-1000px' },
  animate: { opacity: 1, y: '0%', filter: 'blur(0px)', z: '0px' },
  exit: { opacity: 0, y: '50%', filter: 'blur(3px)', z: '-1000px' },
};
