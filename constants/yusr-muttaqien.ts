import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import type { MotionProps } from 'framer-motion';

export const VARIANT_YUSR_MUTTAQIEN: MotionProps = {
  variants: {
    initial: {
      opacity: 0,
      y: '-10%',
      transition: { ...FRAMER_DEFAULT_TIMING },
    },
    visible: {
      opacity: 1,
      y: '0%',
      transition: { ...FRAMER_DEFAULT_TIMING },
    },
    hidden: {
      opacity: 0,
      y: '10%',
      transition: { ...FRAMER_DEFAULT_TIMING },
    },
  },
  initial: 'initial',
  animate: 'visible',
  exit: 'hidden',
};
