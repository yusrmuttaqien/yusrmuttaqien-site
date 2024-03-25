import { MotionProps } from 'framer-motion';

export const ID_PROJECT_CARD_TOGGLE = 'id_project-card-toggle';
export const ID_PROJECT_CARD_TAGS = 'id_project-card-tags';
export const VARIANT_PAGINATION_BTN_BG: MotionProps = {
  transition: { duration: 0.1 },
  variants: {
    initial: { opacity: 0 },
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  },
  initial: 'initial',
  animate: 'visible',
  exit: 'hidden',
};
