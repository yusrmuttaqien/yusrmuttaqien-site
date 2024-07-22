import { useRef } from 'react';
import { useAnimate, useIsomorphicLayoutEffect, useScroll } from 'framer-motion';
import { TIMELINE_SCROLLER } from '@/components/ScrollUp/constant';
import type { AnimationResumables } from '@/types/timeline';

export default function useInteractive() {
  const { scrollY } = useScroll();
  const [scope, animate] = useAnimate();
  const ref = useRef<AnimationResumables>({ instance: null, status: 'not-ready' });

  useIsomorphicLayoutEffect(() => {
    ref.current.instance = animate(TIMELINE_SCROLLER(scope).invisible);
    ref.current.instance.complete();

    function _toggleScrollUp(v: number) {
      requestAnimationFrame(() => {
        const el = document.querySelector('#footer-contact-wrapper') as HTMLDivElement;
        const { innerHeight } = window;
        const currentHeight = v + innerHeight;
        const topHeight = v + el.getBoundingClientRect().top;
        const threshold = currentHeight > topHeight;

        if (threshold && ref.current.status === 'not-ready') {
          ref.current.instance?.stop();

          ref.current.instance = animate(TIMELINE_SCROLLER(scope).visible);
          ref.current.status = 'complete';
        } else if (!threshold && ref.current.status === 'complete') {
          ref.current.instance?.stop();

          ref.current.instance = animate(TIMELINE_SCROLLER(scope).invisible);
          ref.current.status = 'not-ready';
        }
      });
    }

    scrollY.on('change', _toggleScrollUp);

    return () => {
      scrollY.clearListeners();
    };
  }, []);

  return { scope };
}
