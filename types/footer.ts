import type { YusrMuttaqienProps } from '@/types/yusr-muttaqien';
import type { ReactNode } from 'react';

export type FooterYusrMuttaqienProps = {
  className?: YusrMuttaqienProps['className'];
};
export type SectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
};
