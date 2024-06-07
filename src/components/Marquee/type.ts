import { MARQUEE_STYLES } from '@/components/Marquee';
import type { ReactNode } from 'react';

type SharedProps = {
  children: ReactNode;
  velocity?: number;
  direction?: 'left' | 'right';
  lockDirection?: boolean;
};

export type MarqueeProps = {
  name: string;
  className?: Partial<typeof MARQUEE_STYLES.slots>;
} & SharedProps;
export type InteractiveParams = SharedProps;
