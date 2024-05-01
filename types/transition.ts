import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export type TransitionProps = {
  children: ReactNode;
} & Omit<HTMLMotionProps<'main'>, 'children'>;
