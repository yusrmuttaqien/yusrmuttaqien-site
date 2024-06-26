import type { HTMLMotionProps, MotionValue } from 'framer-motion';

export type RolesProps = {
  p?: HTMLMotionProps<'p'>;
  rootMotionValue: MotionValue<number>;
};

export type RoleProps = {
  idx: number;
  children: string;
  rootMotionValue: MotionValue<number>;
} & Omit<HTMLMotionProps<'p'>, 'children'>;
