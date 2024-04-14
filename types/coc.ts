import { styles } from '@/components/coc';
import type { HTMLAttributes } from 'react';

export type COCProps = {
  className?: Partial<typeof styles.slots>;
} & Omit<HTMLAttributes<HTMLOrSVGElement>, 'className'>;
