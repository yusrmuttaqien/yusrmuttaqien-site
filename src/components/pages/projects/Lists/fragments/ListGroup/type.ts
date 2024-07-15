import type { ReactNode } from 'react';
import type { MotionValue } from 'framer-motion';
import { Project } from '@/types/contents';

export type ListGroupProps = {
  count: number;
  title: string;
  className?: string;
  children: ReactNode;
};
export type ContentProps = {
  className?: string;
  activeContent: MotionValue<string>;
  project: Project;
};
export type InteractiveParams = {
  title: string;
  activeContent: MotionValue<string>;
};
