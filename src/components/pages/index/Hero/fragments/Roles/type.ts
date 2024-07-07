import type { HTMLMotionProps, MotionValue } from 'framer-motion';

type RootMotionValue = MotionValue<number>;
export type RolesProps = {
  p?: HTMLMotionProps<'p'>;
  rootMotionValue: RootMotionValue;
};
export type RoleProps = {
  idx: number;
  children: string;
  rootMotionValue: RootMotionValue;
} & Omit<HTMLMotionProps<'p'>, 'children'>;
export type InteractiveParams = {
  rootMotionValue: RootMotionValue;
  idx: number;
};
