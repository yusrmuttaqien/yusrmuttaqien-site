import { SECTION_STYLES } from '@/components/Footer/fragments/Section';
import type { ReactNode } from 'react';

export type SectionProps = {
  title: string;
  children: ReactNode;
  className?: Partial<typeof SECTION_STYLES.slots>;
};
