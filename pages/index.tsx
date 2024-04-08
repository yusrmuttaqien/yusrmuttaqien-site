import TransitionSlideUp from '@/transitions/transition-slide-up';
import HomeHero from '@/fragments/home/home-hero/home-hero';
import HomeMasteries from '@/fragments/home/home-masteries/home-masteries';
import classMerge from '@/utils/class-merge';

export default function Home() {
  return (
    <TransitionSlideUp>
      <HomeHero />
      <HomeMasteries
        className={classMerge(
          'mt-[clamp(5.5625rem,_-0.0739rem_+_28.1818vw,_7.5rem)]',
          'mb-[clamp(9.3125rem,_0.0398rem_+_46.3636vw,_12.5rem)]',
          'lg:mb-[clamp(12.5rem,_6.6564rem_+_11.2108vw,_15.625rem)]'
        )}
      />
    </TransitionSlideUp>
  );
}
