import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useMediaQueryCtx } from '@/providers/media-query';
import HomeHowHeader from '@/fragments/home/home-how/home-how-header';
import HomeHowDesktop from '@/fragments/home/home-how/home-how-desktop';
import HomeHowMobile from '@/fragments/home/home-how/home-how-mobile';
import classMerge from '@/utils/class-merge';

export default function HomeHow({ className }: { className?: string }) {
  const { locale } = useRouter();
  const { isScreenDesktop } = useMediaQueryCtx();
  const scope = useRef<HTMLDivElement>(null);

  return (
    <section
      id="home-how"
      ref={scope}
      className={classMerge(
        'container xl:px-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]',
        'space-y-[clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)]',
        'xl:space-y-[calc(clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)_*_2)]',
        className
      )}
    >
      <HomeHowHeader />
      {isScreenDesktop ? <HomeHowDesktop root={scope} key={locale} /> : <HomeHowMobile />}
    </section>
  );
}
