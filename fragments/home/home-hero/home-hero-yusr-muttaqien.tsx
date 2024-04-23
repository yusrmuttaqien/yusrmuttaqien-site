import { useInView } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import YusrMuttaqien from '@/components/yusr-muttaqien';
import type { RefObject } from 'react';

export default function HomeHeroYusrMuttaqien({ root }: { root: RefObject<HTMLDivElement> }) {
  const {
    state: { yusrMuttaqien },
    setState,
  } = useAnimationSequenceCtx();
  const isInView = useInView(root);

  useIsomorphicLayoutEffect(() => {
    if (isInView === yusrMuttaqien.hero) return;

    setState((draft) => {
      draft.yusrMuttaqien.hero = isInView;
    });
  }, [yusrMuttaqien.hero, isInView]);

  return <YusrMuttaqien isVisible={yusrMuttaqien.hero} withPlaceholder />;
}
