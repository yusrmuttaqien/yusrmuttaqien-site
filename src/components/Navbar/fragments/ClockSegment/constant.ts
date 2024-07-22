import { EASE_OUT_QUART, EASE_IN_QUART } from '@/constants/motion';
import type { MotionProps } from 'framer-motion';

export const VARIANT: MotionProps = {
  initial: { opacity: 0, y: '-50%', filter: 'blur(3px)', z: '-1000px' },
  animate: {
    opacity: 1,
    y: '0%',
    filter: 'blur(0px)',
    z: '0px',
    transition: { duration: 0.3, ease: EASE_OUT_QUART, delay: 0.2 },
  },
  exit: {
    opacity: 0,
    y: '60%',
    filter: 'blur(3px)',
    z: '-1000px',
    transition: { duration: 0.3, ease: EASE_IN_QUART },
  },
};
