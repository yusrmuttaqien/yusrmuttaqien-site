import { TRANSITION_STYLES } from '@/components/Transition';
import { VARIANT } from '@/components/Transition/constant';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

export type TransitionAnimatable = keyof typeof VARIANT.animate;
export type TransitionProps = {
  children: ReactNode;
  className?: Partial<typeof TRANSITION_STYLES.slots>;
} & Omit<Omit<HTMLMotionProps<'main'>, 'className'>, 'children'>;
