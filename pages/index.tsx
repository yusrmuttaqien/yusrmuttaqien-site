import { Fragment } from 'react';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import HomeHero from '@/fragments/home/home-hero/home-hero';
import HomeMasteries from '@/fragments/home/home-masteries/home-masteries';
import HomeProjects from '@/fragments/home/home-projects/home-projects';
import HomeHow from '@/fragments/home/home-how/home-how';
import classMerge from '@/utils/class-merge';

const spacingStyles = classMerge(
  // 'mt-[clamp(5.5625rem,_-0.0739rem_+_28.1818vw,_7.5rem)]',
  'my-[clamp(9.3125rem,_0.0398rem_+_46.3636vw,_12.5rem)]',
  'lg:my-[clamp(12.5rem,_6.6564rem_+_11.2108vw,_15.625rem)]'
);

export default function Home() {
  const { setState } = useAnimationSequenceCtx();

  useIsomorphicLayoutEffect(() => {
    setState((draft) => {
      draft.announcer.announcing = false;
      draft.isPageReady = true;
    });
  }, []);

  return (
    <Fragment>
      <HomeHero />
      <HomeMasteries
        className={{
          wrapper: spacingStyles,
          // TODO: Check whether margin affect scroll margin, decide use id in wrapper or container
          // container: 'scroll-mt-[calc(var(--navbar-total-height)_+_10)]',
        }}
      />
      <HomeProjects className={spacingStyles} />
      <HomeHow className={spacingStyles} />
    </Fragment>
  );
}
