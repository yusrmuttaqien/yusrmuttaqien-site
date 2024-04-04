'use client';

import { useLayoutEffect } from 'react';
import usePageTransition from '@/app/hooks/page-transition';

export default function MainInteractive() {
  const { complete } = usePageTransition();

  useLayoutEffect(() => {
    complete({
      sequences(draft) {
        draft.yusrMuttaqien.navbar = true;
      },
    });
  }, []);

  return null;
}
