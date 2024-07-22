import useInteractive from '@/components/pages/index/Hero/fragments/LinksItem/hooks/interactive';
import Link from '@/components/Link';
import Trans from '@/components/Trans';
import type { TransComp } from '@/components/Trans/type';
import type { LinksItemProps } from '@/components/pages/index/Hero/fragments/LinksItem/type';

const COMPS: TransComp = {
  default: (value, id) => (
    <span key={id} className="text-dynamic-green">
      {value}
    </span>
  ),
};

export default function LinksItem(props: LinksItemProps) {
  const { rootMotionValue, children, idx, ...rest } = props;
  const style = useInteractive({ rootMotionValue, idx });

  return (
    <Link {...rest} motionWrapper={{ style }} key={children} id="link">
      <Trans string={children} name="hero-link" comps={COMPS} />
    </Link>
  );
}
