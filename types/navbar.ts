import type { MotionProps } from 'framer-motion';

export type AnimatedDigitProps = {
  digit: string;
  variant?: MotionProps;
  sign: string;
  className?: string;
};
export type LangProps = {
  className?: string;
};
export type SwitchProps = {
  locale: string;
  className?: string;
  idx: number;
};
export type NavbarProps = {
  className?: string;
};
