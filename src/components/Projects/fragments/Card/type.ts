import type { ProjectHref } from '@/types/contents';
import type { ReactNode } from 'react';

export type CardProps = {
  src: string;
  alt: string;
  title: ReactNode;
  year: string;
  category: string;
  collaborator: ReactNode;
  className?: string;
  href: ProjectHref[];
};
