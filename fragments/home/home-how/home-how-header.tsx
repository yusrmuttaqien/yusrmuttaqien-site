import { useMediaQueryCtx } from '@/providers/media-query';
import COC from '@/components/coc';
import classMerge from '@/utils/class-merge';

export default function HomeHowHeader() {
  const { isScreenDesktop } = useMediaQueryCtx();

  return (
    <header
      className={classMerge(
        'flex flex-col justify-between gap-[clamp(0.75rem,_0.0227rem_+_3.6364vw,_1rem)]',
        'lg:flex-row lg:items-center'
      )}
    >
      <h2 className="body-subheading text-green-dynamic uppercase shrink-0">
        See how i roll<span className="ml-[.5ch]">🛞</span>
      </h2>
      <p className="uppercase lg:max-w-[400px] lg:text-right xl:text-left">
        Working holistically, from top to bottom. Make sure not to regrets midway.
      </p>
      {isScreenDesktop && (
        <COC
          className={{
            container: 'w-40',
            path: 'fill-grey dark:fill-beige opacity-20',
            stroke: 'fill-beige-off dark:fill-grey-off',
          }}
        />
      )}
    </header>
  );
}
