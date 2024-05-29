import { motion } from 'framer-motion';
import classMerge from '@/utils/classMerge';
import type { PatternProps } from '@/components/Hero/fragments/Pattern/type';

export default function Pattern(props: PatternProps) {
  const { className, highlight, style, ...rest } = props;
  const { className: hClassName, ...Hrest } = highlight;

  return (
    <motion.div
      {...rest}
      id="pattern"
      className={classMerge('bg-dynamic-[grey_15] grid place-items-center', className)}
      style={{
        maskImage: 'url("/pattern.svg")',
        WebkitMaskImage: 'url("/pattern.svg")',
        maskRepeat: 'repeat repeat',
        maskPosition: 'center center',
        maskSize: '10rem',
        ...style,
      }}
    >
      <motion.div
        {...Hrest}
        id="highlight"
        className={classMerge(
          'bg-dynamic-[green_95] w-[20%] aspect-square blur-3xl rounded-full absolute top-1/2 left-1/2',
          '-translate-x-1/2 -translate-y-1/2',
          hClassName
        )}
      />
    </motion.div>
  );
}
