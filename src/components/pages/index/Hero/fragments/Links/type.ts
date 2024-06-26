import type { MotionValue } from 'framer-motion';
import type { LinkProps as LinkCompProps } from '@/components/Link/type';

export type LinksProps = {
  className?: string;
  rootMotionValue: MotionValue<number>;
};

export type LinkProps = {
  rootMotionValue: MotionValue<number>;
  children: string;
  idx: number;
} & LinkCompProps;
