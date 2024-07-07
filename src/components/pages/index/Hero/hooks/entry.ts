import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useAnimate, useIsomorphicLayoutEffect, useInView } from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';
import useScrollLock from '@/hooks/scrollLock';
import { TIMELINE_ENTRY } from '@/components/pages/index/Hero/constant';
import isTopFold from '@/utils/isTopFold';
import { TRANSITION_LOCK_ID } from '@/components/Transition';
import type { AnimationResumables } from '@/types/timeline';

export default function useEntry() {
  const { asPath } = useRouter();
  const { unlock } = useScrollLock();
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true });
  const { isLoader, set } = useTogglesStore((state) => ({
    isLoader: state.isLoader,
    set: state.set,
  }));
  const resumables = useRef<AnimationResumables>({ instance: null, status: 'not-ready' });

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLElement;
    const status = resumables.current.status;

    function _startSequence(complete: boolean = false) {
      const prepare = animate(TIMELINE_ENTRY.invisible);
      resumables.current.status = 'preparing';
      prepare.then(() => {
        root.classList.remove('invisible');

        resumables.current.instance = animate(TIMELINE_ENTRY.visible);
        resumables.current.instance.then(() => {
          resumables.current.status = 'complete';
          unlock(TRANSITION_LOCK_ID, true);
          set('isIndexHeroEntry', false);
        });
        resumables.current.status = 'running';
        complete && resumables.current.instance?.complete();
      });
      prepare.complete();
    }

    if (!isLoader && inView && (status === 'not-ready' || status === 'preparing')) {
      _startSequence();
    } else if (!isLoader && isTopFold(root)) {
      _startSequence(true);
    } else if (isLoader && inView && window.scrollY > 0) {
      const isAnchor = asPath.includes('#');

      !isAnchor && window.scrollTo(0, 0);
    }
  }, [isLoader, inView, asPath]);

  return { scope };
}
