import MainHeroYusrMuttaqien from '@/app/fragments/main/main-hero/main-hero-yusr-muttaqien';
import MainHeroAnimate from '@/app/fragments/main/main-hero/main-hero-animate';
import Blueprint from '@/app/components/blueprint';
import classMerge from '@/app/utils/class-merge';
import { getRootParams } from '@/app/utils/root-params';
import mainContents from '@/app/contents/main';

import type { i18nTypes } from '@/app/types/i18n';

export default async function MainHero({ className }: { className?: string }) {
  const { params } = getRootParams();
  const { tagline } = await mainContents(params.lang as i18nTypes);

  return (
    <MainHeroAnimate className={className}>
      <header
        className={classMerge(
          'z-10 w-full',
          'p-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]',
          'bg-beige/80 backdrop-blur-8 dark:bg-grey/80'
        )}
      >
        <p className="body-subheading lg:-mb-[1.5vw]">{tagline}</p>
        <MainHeroYusrMuttaqien />
      </header>
      <Blueprint className="absolute top-0 left-0 pointer-events-none" />
    </MainHeroAnimate>
  );
}
