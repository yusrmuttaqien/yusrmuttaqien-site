import { useRef } from 'react';
import { useAnimate, useInView, useIsomorphicLayoutEffect } from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';
import { useMediaQueryStore } from '@/contexts/mediaQueries';
import { TIMELINE_ENTRY } from '@/components/Navbar/constant';
import type { AnimationResumables } from '@/types/timeline';

export default function useEntry() {
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { once: true });
  const isXL = useMediaQueryStore((state) => state.isXL);
  const isLoader = useTogglesStore((state) => state.isLoader);
  const resumables = useRef<AnimationResumables>({ instance: null, status: 'not-ready' });

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLElement;
    const screenMode = isXL ? 'desktop' : 'mobile';
    const status = resumables.current.status;

    function _startSequence() {
      const prepare = animate(TIMELINE_ENTRY(screenMode).invisible);
      resumables.current.status = 'preparing';
      prepare.then(() => {
        root.classList.remove('invisible');
        resumables.current.instance = animate(TIMELINE_ENTRY(screenMode).visible);
        resumables.current.instance.then(() => {
          resumables.current.status = 'complete';
        });
        resumables.current.status = 'running';
      });
      prepare.complete();
    }
    async function _resumeSequence() {
      if (!resumables.current.instance) return;
      resumables.current.instance?.stop();

      const time = resumables.current.instance?.time;
      resumables.current.instance = animate(TIMELINE_ENTRY(screenMode).visible);
      resumables.current.instance.pause();
      resumables.current.instance.then(() => {
        resumables.current.status = 'complete';
      });
      resumables.current.instance.time = time;
      resumables.current.instance.play();
    }

    if ((!isLoader && inView && status === 'not-ready') || status === 'preparing') {
      _startSequence();
    } else if (status === 'running') {
      _resumeSequence();
    }
  }, [isLoader, inView, isXL]);

  return { scope };
}
