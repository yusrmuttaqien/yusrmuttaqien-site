import { motion } from 'framer-motion';
import classMerge from '@/utils/classMerge';
import { VARIANT } from '@/components/Transition/constant';
import type { TransitionProps } from '@/components/Transition/type';

export default function Transition(props: TransitionProps) {
  const { children, className, ...rest } = props;

  return (
    <motion.main {...VARIANT} className={classMerge('relative', className)} {...rest}>
      {children}
    </motion.main>
  );
}
