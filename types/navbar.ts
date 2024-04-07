import type { MotionProps } from 'framer-motion';

export type AnimatedDigitProps = {
  digit: string;
  variant?: MotionProps;
  sign: string;
  className?: string;
};
export type LangProps = {
  locale: string;
  className?: string;
  idx: number;
};
