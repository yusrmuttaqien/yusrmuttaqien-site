import type { MotionValue } from 'framer-motion';
import type { LinkProps as LinkCompProps } from '@/components/Link/type';

type RootMotionValue = MotionValue<number>;
export type LinksItemProps = {
  rootMotionValue: RootMotionValue;
  children: string;
  idx: number;
} & LinkCompProps;
export type InteractiveParams = {
  rootMotionValue: RootMotionValue;
  idx: number;
};
