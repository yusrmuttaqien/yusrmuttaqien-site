import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import YusrMuttaqien from '@/components/yusr-muttaqien';

export default function HomeHeroYusrMuttaqien() {
  const yusrMuttaqienRef = useRef<HTMLDivElement>(null);
  const {
    state: { yusrMuttaqien },
    setState,
  } = useAnimationSequenceCtx();
  const isInView = useInView(yusrMuttaqienRef);

  useIsomorphicLayoutEffect(() => {
    if (isInView === yusrMuttaqien.hero) return;

    setState((draft) => {
      draft.yusrMuttaqien.hero = isInView;
    });
  }, [yusrMuttaqien.hero, isInView]);

  return <YusrMuttaqien isVisible={yusrMuttaqien.hero} withPlaceholder ref={yusrMuttaqienRef} />;
}
