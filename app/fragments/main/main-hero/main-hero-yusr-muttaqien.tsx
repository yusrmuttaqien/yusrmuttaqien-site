'use client';

import { useLayoutEffect } from 'react';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';
import YusrMuttaqienPlaceholderObserver from '@/app/utils/fragments/yusr-muttaqien-placeholder-observer';

const YUSR_MUTTAQIEN_PLACEHOLDER_ID = '-hero';

export default function MainHeroYusrMuttaqien() {
  const {
    state: { yusrMuttaqien },
    setState,
  } = useAnimationSequenceCtx();
  const isShowTitle = yusrMuttaqien.hero;

  useLayoutEffect(() => {
    function togglePlaceholder() {
      setState((draft) => {
        draft.yusrMuttaqien.hero = true;
      });

      return () =>
        setState((draft) => {
          draft.yusrMuttaqien.hero = false;
        });
    }

    const stopObserve = YusrMuttaqienPlaceholderObserver(
      YUSR_MUTTAQIEN_PLACEHOLDER_ID,
      togglePlaceholder,
      {
        margin: '-20% 0% 0% 0%',
        amount: 'some',
      }
    );

    return () => stopObserve?.();
  }, []);

  return <YusrMuttaqien isVisible={isShowTitle} withPlaceholder={YUSR_MUTTAQIEN_PLACEHOLDER_ID} />;
}
