import { useRef } from 'react';
import { useAnimate, useIsomorphicLayoutEffect, useInView } from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';
import { TIMELINE_ENTRY } from '@/components/Hero/constant';
import type { AnimationResumables } from '@/types/timeline';

export default function useEntry() {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true });
  const isLoader = useTogglesStore((state) => state.isLoader);
  const resumables = useRef<AnimationResumables>({ instance: null, status: 'not-ready' });

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLElement;
    const status = resumables.current.status;

    function _startSequence() {
      const prepare = animate(TIMELINE_ENTRY.invisible);
      resumables.current.status = 'preparing';
      prepare.then(() => {
        root.classList.remove('invisible');
        resumables.current.instance = animate(TIMELINE_ENTRY.visible);
        resumables.current.instance.then(() => {
          resumables.current.status = 'complete';
        });
        resumables.current.status = 'running';
      });
      prepare.complete();
    }

    if ((!isLoader && inView && status === 'not-ready') || status === 'preparing') {
      _startSequence();
    }
  }, [isLoader, inView]);

  return { scope };
}
