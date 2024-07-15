import GLOBAL_UNTRANSLATED from '@/contents/untranslated';
import type { ReactNode } from 'react';

export enum ProjectFlag {
  ACCESSIBLE = 'accessible',
  ONGOING = 'ongoing',
  UPCOMING = 'upcoming',
}
export type Project = {
  title: ReactNode;
  category: string[];
  titleString: string;
  alt: string;
} & Omit<typeof GLOBAL_UNTRANSLATED.projects.findMovie, 'categories'>;
