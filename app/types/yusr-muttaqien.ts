import { styles } from '@/app/components/yusr-muttaqien';
import type { HTMLMotionProps } from 'framer-motion';

export type YusrMuttaqienProps = {
  withPlaceholder?: string;
  isVisible: boolean;
  className?: Partial<typeof styles.slots>;
} & Omit<HTMLMotionProps<'div'>, 'className'>;

export type YusrMuttaqienSVGSProps = {
  className?: Partial<typeof styles.slots>;
};
