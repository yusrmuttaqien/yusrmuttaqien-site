// TODO: Change scroll distance to be dynamic few pixels above the footer contact
import { useRef } from 'react';
import { useAnimate, useIsomorphicLayoutEffect, useScroll } from 'framer-motion';
import { TIMELINE_SCROLLER, SCROLL_DISTANCE } from '@/components/ScrollUp/constant';
import type { AnimationResumables } from '@/types/timeline';

export default function useInteractive() {
  const [scope, animate] = useAnimate();
  const { scrollYProgress } = useScroll();
  const ref = useRef<AnimationResumables>({ instance: null, status: 'not-ready' });

  useIsomorphicLayoutEffect(() => {
    ref.current.instance = animate(TIMELINE_SCROLLER(scope).invisible);
    ref.current.instance.complete();

    function _toggleScrollUp(v: number) {
      if (v >= SCROLL_DISTANCE && ref.current.status === 'not-ready') {
        ref.current.instance?.stop();

        ref.current.instance = animate(TIMELINE_SCROLLER(scope).visible);
        ref.current.status = 'complete';
      } else if (v < SCROLL_DISTANCE && ref.current.status === 'complete') {
        ref.current.instance?.stop();

        ref.current.instance = animate(TIMELINE_SCROLLER(scope).invisible);
        ref.current.status = 'not-ready';
      }
    }

    scrollYProgress.on('change', _toggleScrollUp);

    return () => {
      scrollYProgress.clearListeners();
    };
  }, []);

  return { scope };
}
