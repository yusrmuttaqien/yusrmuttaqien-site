'use client';

import { inView } from 'framer-motion';
import { useLayoutEffect, useEffect, useRef } from 'react';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';

const PLACEHOLDER_ID = 'main-hero-yusr-muttaqien-placeholder';

export default function MainHeroYusrMuttaqien() {
  const viewRef = useRef(null);
  const {
    state: { bigTitlePos, navbarAnimatePresence },
    setState,
  } = useAnimationSequenceCtx();
  const isShowTitle = bigTitlePos.hero;

  useLayoutEffect(() => {
    const stopObserve = inView(
      document.getElementById(PLACEHOLDER_ID) as HTMLElement,
      () => {
        setState((draft) => {
          draft.bigTitlePos.hero = true;
        });

        return () =>
          setState((draft) => {
            draft.bigTitlePos.hero = false;
          });
      },
      { margin: '-20% 0% 0% 0%', amount: 'some' }
    );

    return () => stopObserve();
  }, [setState]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (navbarAnimatePresence) {
      timeout = setTimeout(() => {
        setState((draft) => {
          draft.navbarAnimatePresence = false;
        });
      }, 50);
    }

    return () => clearTimeout(timeout);
  }, [navbarAnimatePresence, setState]);

  return (
    <div className="relative w-full">
      {isShowTitle && <YusrMuttaqien className={{ wrapper: 'absolute top-0 left-0' }} />}
      <div ref={viewRef} id={PLACEHOLDER_ID} className="w-full opacity-0">
        <YusrMuttaqien asPlaceholder />
      </div>
    </div>
  );
}
