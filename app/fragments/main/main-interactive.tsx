'use client';

import { useLayoutEffect } from 'react';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';

export default function MainInteractive() {
  const { setState } = useAnimationSequenceCtx();

  useLayoutEffect(() => {
    setState((draft) => {
      draft.yusrMuttaqien.navbar = true;
      draft.announcer.announcing = false;
    });

    const timeout = setTimeout(() => {
      setState((draft) => {
        draft.yusrMuttaqien.config.forceDisableLayout = false;
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
