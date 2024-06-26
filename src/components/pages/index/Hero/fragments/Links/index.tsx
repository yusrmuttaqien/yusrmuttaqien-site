import { useTransform, motion } from 'framer-motion';
import useContent from '@/components/pages/index/Hero/hooks/content';
import Link from '@/components/Link';
import Trans from '@/components/Trans';
import classMerge from '@/utils/classMerge';
import type { TransComp } from '@/components/Trans/type';
import type { LinkProps, LinksProps } from '@/components/pages/index/Hero/fragments/Links/type';

const COMPS: TransComp = {
  default: (value, id) => (
    <span key={id} className="text-dynamic-green">
      {value}
    </span>
  ),
};

export default function Links(props: LinksProps) {
  const { className, rootMotionValue } = props;
  const { internets, internetsTitle } = useContent();
  // TODO: Move to hooks
  const z = useTransform(rootMotionValue, [0, 1], ['0px', '1000px']);
  const opacity = useTransform(rootMotionValue, [0, 1], [1, 0]);
  const filter = useTransform(rootMotionValue, [0, 1], ['blur(0px)', 'blur(16px)']);

  return (
    <div
      className={classMerge(
        'space-y-3 perspective-5000 xl-only:perspective-origin-left',
        className
      )}
    >
      <motion.h3
        style={{ z, opacity, filter }}
        id="linksTitle"
        className="trim-helvetiva-neue text-dynamic-[grey_60]"
      >
        {internetsTitle}
      </motion.h3>
      <div className="flex gap-3 flex-wrap transform-preserve3d lg-850:gap-6">
        {internets.map(({ title, ...rest }, idx) => (
          <LinkFragment key={title} rootMotionValue={rootMotionValue} idx={idx} {...rest}>
            {title}
          </LinkFragment>
        ))}
      </div>
    </div>
  );
}

function LinkFragment(props: LinkProps) {
  const { rootMotionValue, children, idx, ...rest } = props;
  // TODO: Move to hooks
  const z = useTransform(rootMotionValue, [0 + (idx + 1 * 2) / 10, 1], ['0px', '1000px']);
  const opacity = useTransform(rootMotionValue, [0 + (idx + 1 * 2) / 10, 1], [1, 0]);
  const filter = useTransform(
    rootMotionValue,
    [0 + (idx + 1 * 2) / 10, 1],
    ['blur(0px)', 'blur(16px)']
  );

  return (
    <Link {...rest} motionWrapper={{ style: { z, opacity, filter } }} key={children} id="link">
      <Trans string={children} name="hero-link" comps={COMPS} />
    </Link>
  );
}
