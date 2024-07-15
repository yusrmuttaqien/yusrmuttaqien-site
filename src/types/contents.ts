import GLOBAL_UNTRANSLATED from '@/contents/untranslated';
import type { ReactNode } from 'react';

export type Project = { title: ReactNode; category: string[] } & Omit<
  typeof GLOBAL_UNTRANSLATED.projects.findMovie,
  'categories'
>;
