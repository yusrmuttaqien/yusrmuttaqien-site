import { styles } from '@/components/image';
import type { ImageProps as NextImageProps } from 'next/image';
import type { HTMLMotionProps, MotionValue } from 'framer-motion';

export type ImageProps = {
  className?: Partial<typeof styles.slots>;
  imageScale?: number;
} & Omit<HTMLMotionProps<'img'>, 'className'> &
  Omit<NextImageProps, 'className' | 'style'>;
export type InteractiveProps = {
  scale: number;
};
