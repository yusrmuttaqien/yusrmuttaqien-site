import useContent from '@/components/Hero/hooks/content';
import Link from '@/components/Link';
import Trans from '@/components/Trans';
import classMerge from '@/utils/classMerge';
import type { TransComp } from '@/components/Trans/type';
import type { LinksProps } from '@/components/Hero/fragments/Links/type';

const COMPS: TransComp = {
  VA: (value) => <span className="text-dynamic-green">{value}</span>,
};

export default function Links(props: LinksProps) {
  const { className } = props;
  const { internets, internetsTitle } = useContent();

  return (
    <div className={classMerge('space-y-3', className)}>
      <h3 className="trim-helvetiva-neue text-dynamic-[grey_60]">{internetsTitle}</h3>
      <div className="flex gap-3 flex-wrap lg-850:gap-6">
        {internets.map(({ title, ...rest }) => (
          <Link className="trim-helvetiva-neue" key={title} {...rest}>
            <Trans string={title} name="hero-link" comps={COMPS} />
          </Link>
        ))}
      </div>
    </div>
  );
}
