'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';

const MAGIC_HANDOFF_PERCENTAGE = 83.1 / 100;
const MAGIC_HANDOFF_TRESHOLD = '-15% 0px 0px 0px';

export default function MainHeroYusrMuttaqien() {
  const viewRef = useRef(null);
  const inView = useInView(viewRef, { margin: MAGIC_HANDOFF_TRESHOLD });
  const {
    state: { isHeroNavHandoff },
    setState,
  } = useAnimationSequenceCtx();

  useEffect(() => {
    const isOnHandoff = window.scrollY >= MAGIC_HANDOFF_PERCENTAGE * window.innerHeight;

    setState((draft) => {
      if (isHeroNavHandoff === undefined) {
        draft.isHeroNavHandoff = isOnHandoff;
      } else {
        draft.isHeroNavHandoff = !inView;
      }
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
