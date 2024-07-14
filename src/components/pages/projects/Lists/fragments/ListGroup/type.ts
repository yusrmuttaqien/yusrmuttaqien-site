import type { ReactNode } from 'react';
import type { MotionValue } from 'framer-motion';

export type ListGroupProps = {
  count: number;
  title: string;
  className?: string;
  children: ReactNode;
};
export type ContentProps = {
  className?: string;
  activeContent: MotionValue<string>;
};
