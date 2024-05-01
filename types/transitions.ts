import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export type SlideUpProps = {
  children: ReactNode;
} & Omit<HTMLMotionProps<'main'>, 'children'>;
