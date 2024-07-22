import type { MotionValue } from 'framer-motion';

type RootMotionValue = MotionValue<number>;
export type LinksProps = {
  className?: string;
  rootMotionValue: RootMotionValue;
};
export type InteractiveParams = {
  rootMotionValue: RootMotionValue;
};
