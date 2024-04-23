import { useMediaQueryCtx } from '@/providers/media-query';
import COC from '@/components/coc';
import classMerge from '@/utils/class-merge';
import useContent from '@/contents/home';

export default function HomeHowHeader() {
  const {
    how: { header },
  } = useContent();
  const { isScreenDesktop } = useMediaQueryCtx();

  return (
    <header
      className={classMerge(
        'flex flex-col justify-between gap-[clamp(0.75rem,_0.0227rem_+_3.6364vw,_1rem)]',
        'lg:flex-row lg:items-center'
      )}
    >
      <h2
        data-framer="how-header-title"
        className="body-subheading text-green-dynamic uppercase shrink-0 mr-[.5ch]"
      >
        {header.title}
      </h2>
      <p
        data-framer="how-header-subtitle"
        className="lg:max-w-[400px] lg:text-right xl:text-left opacity-60"
      >
        {header.subtitle}
      </p>
      {isScreenDesktop && (
        <COC
          className={{
            container: 'w-40',
            path: 'fill-grey-dynamic-[]',
            stroke: 'fill-beige-off-dynamic-[]',
          }}
        />
      )}
    </header>
  );
}
