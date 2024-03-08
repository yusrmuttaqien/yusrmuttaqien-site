'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';

export default function MainHeroYusrMuttaqien() {
  const viewRef = useRef(null);
  const inView = useInView(viewRef, { margin: '-15% 0px 0px 0px' });
  const {
    state: { isHeroNavHandoff },
    setState,
  } = useAnimationSequenceCtx();

  useEffect(() => {
    setState((draft) => {
      draft.isHeroNavHandoff = !inView;
    });
  }, [inView]);

  return (
    <div className="relative w-full">
      {!isHeroNavHandoff && <YusrMuttaqien className="absolute top-0 left-0" />}
      <div ref={viewRef} className="w-full opacity-0">
        <YusrMuttaqien />
      </div>
    </div>
  );
}
