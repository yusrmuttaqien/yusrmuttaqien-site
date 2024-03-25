import { MotionProps } from 'framer-motion';

export const ID_NAVBAR_YUSR_MUTTAQIEN = 'id_navbar_yusr_muttaqien';
export const VARIANT_YUSR_MUTTAQIEN: MotionProps = {
  variants: {
    initial: { opacity: 0, y: '-10%' },
    visible: { opacity: 1, y: '0%' },
    hidden: { opacity: 0 },
  },
  initial: 'initial',
  animate: 'visible',
  exit: 'hidden',
};
export const VARIANT_CLOCK_NUM: MotionProps = {
  variants: {
    initial: { opacity: 0, y: '-30%' },
    visible: { opacity: 1, y: '0%' },
    hidden: { opacity: 0, y: '30%' },
  },
  initial: 'initial',
  animate: 'visible',
  exit: 'hidden',
};
export const VARIANT_CLOCK_COLON: MotionProps = {
  variants: {
    visible: { opacity: 0 },
    hidden: { opacity: 1 },
  },
  animate: 'visible',
  exit: 'hidden',
};
