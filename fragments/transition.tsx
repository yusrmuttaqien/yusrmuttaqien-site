import { motion } from 'framer-motion';
import classMerge from '@/utils/class-merge';
import { SLIDE_UP_VARIANT } from '@/constants/transitions';
import type { TransitionProps } from '@/types/transition';

export default function Transition(props: TransitionProps) {
  const { children, className, ...rest } = props;

  return (
    <motion.main {...SLIDE_UP_VARIANT} className={classMerge('relative', className)} {...rest}>
      {children}
    </motion.main>
  );
}
