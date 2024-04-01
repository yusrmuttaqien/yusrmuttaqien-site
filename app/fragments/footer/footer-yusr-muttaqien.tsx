'use client';

import { useLayoutEffect } from 'react';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';
import YusrMuttaqienPlaceholderObserver from '@/app/utils/fragments/yusr-muttaqien-placeholder-observer';

const YUSR_MUTTAQIEN_PLACEHOLDER_ID = '-footer';

export default function FooterYusrMuttaqien() {
  const {
    state: { yusrMuttaqien },
    setState,
  } = useAnimationSequenceCtx();
  const isShowTitle = yusrMuttaqien.footer;

  useLayoutEffect(() => {
    function togglePlaceholder() {
      setState((draft) => {
        draft.yusrMuttaqien.footer = true;
      });

      return () =>
        setState((draft) => {
          draft.yusrMuttaqien.footer = false;
        });
    }

    const stopObserve = YusrMuttaqienPlaceholderObserver(
      YUSR_MUTTAQIEN_PLACEHOLDER_ID,
      togglePlaceholder,
      {
        margin: '0% 0% -5% 0%',
        amount: 'some',
      }
    );

    return () => stopObserve?.();
  }, []);

  return <YusrMuttaqien isVisible={isShowTitle} withPlaceholder={YUSR_MUTTAQIEN_PLACEHOLDER_ID} />;
}
