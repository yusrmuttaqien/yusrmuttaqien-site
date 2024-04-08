import { styles } from '@/components/section-header';
import type { ReactNode } from 'react';

export type SectionHeaderProps = {
  subtitle: string;
  title: string;
  children?: ReactNode;
  className?: Partial<typeof styles.slots>;
};
