import type { ProjectHref } from '@/types/contents';
import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

export type CardProps = {
  src: string | StaticImageData;
  alt: string;
  title: ReactNode;
  year: string;
  category: string;
  collaborator: ReactNode;
  className?: string;
  href: ProjectHref[];
};
