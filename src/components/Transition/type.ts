import { TRANSITION_STYLES } from '@/components/Transition';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export type TransitionProps = {
  children: ReactNode;
  className?: Partial<typeof TRANSITION_STYLES.slots>;
} & Omit<Omit<HTMLMotionProps<'main'>, 'className'>, 'children'>;
