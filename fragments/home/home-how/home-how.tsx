import { useRef } from 'react';
import mergeRefs from 'merge-refs';
import { useRouter } from 'next/router';
import { useMediaQueryCtx } from '@/providers/media-query';
import useHomeHowEntry from '@/hooks/home/home-how/home-how-entry';
import HomeHowHeader from '@/fragments/home/home-how/home-how-header';
import HomeHowDesktop from '@/fragments/home/home-how/home-how-desktop';
import HomeHowMobile from '@/fragments/home/home-how/home-how-mobile';
import classMerge from '@/utils/class-merge';
import type { HowProps } from '@/types/home';

export default function HomeHow(props: HowProps) {
  const { className } = props;
  const { locale } = useRouter();
  const rootScope = useRef<HTMLDivElement>(null);
  const { isScreenDesktop } = useMediaQueryCtx();
  const { scope: entryScope, status } = useHomeHowEntry();

  return (
    <section
      id="home-how"
      ref={mergeRefs(entryScope, rootScope)}
      className={classMerge(
        'container xl:px-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]',
        'space-y-[clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)] invisible',
        'xl:space-y-[calc(clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)_*_2)]',
        className
      )}
    >
      <HomeHowHeader />
      {isScreenDesktop ? (
        <HomeHowDesktop root={rootScope} key={locale} status={status} />
      ) : (
        <HomeHowMobile />
      )}
    </section>
  );
}
