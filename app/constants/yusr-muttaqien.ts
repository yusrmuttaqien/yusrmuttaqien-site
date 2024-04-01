import { MotionProps } from 'framer-motion';

export const ID_YUSR_MUTTAQIEN_PLACEHOLDER = 'id-yusr-muttaqien-placeholder';
export const LAYOUT_YUSR_MUTTAQIEN = 'layout-yusr-muttaqien';
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
