import { MainProjectsCardProps } from '@/app/types/main-projects-card';
import type { Optional } from '@/app/utils/ts-helper';

export const projectLists: Optional<MainProjectsCardProps, 'idx'>[] = [
  {
    children: 'hello',
    tags: ['hello', 'world'],
    title: 'hello',
  },
];
