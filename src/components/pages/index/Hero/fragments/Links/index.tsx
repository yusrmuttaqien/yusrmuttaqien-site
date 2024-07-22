import { motion } from 'framer-motion';
import useContent from '@/components/pages/index/Hero/hooks/content';
import useInteractive from '@/components/pages/index/Hero/fragments/Links/hooks/interactive';
import LinksItem from '@/components/pages/index/Hero/fragments/LinksItem';
import classMerge from '@/utils/classMerge';
import type { LinksProps } from '@/components/pages/index/Hero/fragments/Links/type';

export default function Links(props: LinksProps) {
  const { className, rootMotionValue } = props;
  const { internets, internetsTitle } = useContent();
  const style = useInteractive({ rootMotionValue });

  return (
    <div
      className={classMerge(
        'space-y-3 perspective-5000 xl-only:perspective-origin-left',
        className
      )}
    >
      <motion.h3
        style={style}
        id="linksTitle"
        className="trim-helvetiva-neue text-dynamic-[grey_60]"
      >
        {internetsTitle}
      </motion.h3>
      <div className="flex gap-3 flex-wrap transform-preserve3d lg-850:gap-6">
        {internets.map(({ title, ...rest }, idx) => (
          <LinksItem key={title} rootMotionValue={rootMotionValue} idx={idx} {...rest}>
            {title}
          </LinksItem>
        ))}
      </div>
    </div>
  );
}
