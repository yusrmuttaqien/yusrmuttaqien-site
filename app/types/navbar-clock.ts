import { MotionProps } from 'framer-motion';

export type AnimatedDigitProps = {
  digit: string;
  variant: MotionProps;
  sign: string;
  className?: string;
};
