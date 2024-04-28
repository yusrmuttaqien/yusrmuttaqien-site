import { motion } from 'framer-motion';
import classMerge from '@/utils/class-merge';
import { SLIDE_UP_VARIANT } from '@/constants/transitions';
import type { SlideUpProps } from '@/types/transitions';

export default function TransitionSlideUp(props: SlideUpProps) {
  const { children, className, ...rest } = props;

  return (
    <motion.main {...SLIDE_UP_VARIANT} className={classMerge('relative', className)} {...rest}>
      {children}
    </motion.main>
  );
}
