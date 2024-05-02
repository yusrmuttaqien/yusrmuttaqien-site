import { styles } from '@/components/marquee';
import type { ReactNode } from 'react';

export type MarqueeProps = {
  children: ReactNode;
  baseVelocity: number;
  className?: Partial<typeof styles.slots>;
  name?: string;
  direction?: number | undefined;
};
export type MarqueeInteractiveParam = {
  children: ReactNode;
  baseVelocity: number;
  forceDirection: number | undefined;
};
