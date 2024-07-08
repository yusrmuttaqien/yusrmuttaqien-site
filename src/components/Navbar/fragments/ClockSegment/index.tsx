import { AnimatePresence, motion } from 'framer-motion';
import classMerge from '@/utils/classMerge';
import { VARIANT } from '@/components/Navbar/fragments/ClockSegment/constant';
import type { ClockSegmentProps } from '@/components/Navbar/fragments/ClockSegment/type';

export default function ClockSegment(props: ClockSegmentProps) {
  const { segment, name } = props;

  return (
    <span className="relative transform-preserve3d">
      <AnimatePresence>
        {segment.map((value, index) => (
          <motion.span
            className={classMerge('inline-block absolute', index === 1 && 'right-0')}
            {...VARIANT}
            transition={{ duration: 0.3 }}
            key={`${name}-${index}-${value}`}
          >
            {value}
          </motion.span>
        ))}
      </AnimatePresence>
      <span className="invisible">{segment.join('')}</span>
    </span>
  );
}
