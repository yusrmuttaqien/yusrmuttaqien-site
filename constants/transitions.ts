import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import type { MotionProps } from 'framer-motion';

export const SLIDE_UP_VARIANT: MotionProps = {
  variants: {
    initial: { opacity: 0, y: -150 },
    visible: { opacity: 1, y: 0, transition: FRAMER_DEFAULT_TIMING },
    hidden: { opacity: 0, y: 150, transition: FRAMER_DEFAULT_TIMING },
  },
  initial: 'initial',
  animate: 'visible',
  exit: 'hidden',
};
