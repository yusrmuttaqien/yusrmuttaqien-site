import type { MotionValue, HTMLMotionProps } from 'framer-motion';
import { Project } from '@/types/contents';

export type ListContentProps = {
  className?: string;
  activeContent: MotionValue<string>;
  project: Project;
  id: string;
};
export type ExtensionProps = {
  project: Project;
} & HTMLMotionProps<'section'>;
export type InteractiveParams = {
  title: string;
  activeContent: MotionValue<string>;
};
