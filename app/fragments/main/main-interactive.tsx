'use client';

import { use, useEffect } from 'react';
import usePageTransition from '@/app/hooks/page-transition';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';

export default function MainInteractive() {
  const { complete } = usePageTransition();
  const { setState } = useAnimationSequenceCtx();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    complete({
      sequences(draft) {
        draft.yusrMuttaqien.navbar = true;
        draft.yusrMuttaqien.config.forceDisableLayout = true;
      },
      after() {
        timeout = setTimeout(() => {
          setState((draft) => {
            draft.yusrMuttaqien.config.forceDisableLayout = false;
          });
        }, 100);
      },
    });

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
