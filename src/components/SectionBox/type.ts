import { SECTION_BOX_STYLES } from '@/components/SectionBox';
import type { LegacyRef, ReactNode } from 'react';

export type SectionBoxProps = {
  title: ReactNode;
  children: ReactNode;
  className?: Partial<typeof SECTION_BOX_STYLES.slots>;
  id?: string;
  sectionRef?: LegacyRef<HTMLElement>;
};
