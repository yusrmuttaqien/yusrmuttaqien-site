import { styles } from '@/components/marquee';
import type { ReactNode } from 'react';

export type MarqueeProps = {
  children: ReactNode;
  baseVelocity: number;
  className?: Partial<typeof styles.slots>;
  name?: string;
};
export type MarqueeInteractiveParam = {
  baseVelocity: number;
};
