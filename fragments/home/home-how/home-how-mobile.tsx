import useHomeHowMobileInteractive from '@/hooks/home/home-how/home-how-mobile-interactive';
import HomeHowMobileCard from '@/fragments/home/home-how/home-how-mobile-card';
import useContent from '@/contents/home';
import classMerge from '@/utils/class-merge';
import type { HowMobileHowsProps } from '@/types/home';

export default function HomeHowMobile() {
  const {
    how: { hows },
  } = useContent();
  const howsArray = Object.entries(hows);
  const { scope } = useHomeHowMobileInteractive();

  return (
    <article ref={scope} className="space-y-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]">
      {howsArray.map(([key, content]) => (
        <Hows key={key} name={key} {...content} />
      ))}
    </article>
  );
}

function Hows(props: HowMobileHowsProps) {
  const { name } = props;

  return (
    <section
      data-framer="how-mobile-step"
      className={classMerge(
        'flex flex-col lg:flex-row lg:items-start',
        'gap-[clamp(0.75rem,_0.0227rem_+_3.6364vw,_1rem)] lg:gap-0'
      )}
    >
      <div className="flex items-center flex-1">
        <h3 className="uppercase">{name}</h3>
        <span
          className={classMerge(
            'flex-1 h-[0.0625rem] bg-grey-dynamic-[] ml-8 relative',
            'after:border-b after:border-r after:-rotate-45 after:absolute',
            'after:border-grey-dynamic-[] after:right-0',
            'after:inline-block after:p-[0.3125rem] after:top-1/2 after:-translate-y-1/2',
            'lg:mx-8 after:invisible lg:after:visible'
          )}
        />
      </div>
      <HomeHowMobileCard className="w-full lg:w-[31.25rem]" {...props} />
    </section>
  );
}
