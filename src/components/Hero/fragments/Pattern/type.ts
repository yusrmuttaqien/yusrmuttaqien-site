import { HTMLMotionProps, MotionValue } from 'framer-motion';

export type PatternProps = {
  className?: string;
  highlight: {
    className?: string;
  } & Omit<HTMLMotionProps<'div'>, 'className'>;
} & Omit<HTMLMotionProps<'div'>, 'className'>;
