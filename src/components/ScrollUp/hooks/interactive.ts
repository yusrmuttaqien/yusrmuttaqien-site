import { useRef } from 'react';
import { inView, useAnimate, useIsomorphicLayoutEffect } from 'framer-motion';
import isTopFold from '@/utils/isTopFold';
import { TIMELINE_SCROLLER } from '@/components/ScrollUp/constant';
import type { AnimationResumables } from '@/types/timeline';

export default function useInteractive() {
  const [scope, animate] = useAnimate();
  const ref = useRef<AnimationResumables>({ instance: null, status: 'not-ready' });

  useIsomorphicLayoutEffect(() => {
    const footerContact = document.getElementById('footer-contact') as HTMLAnchorElement;
    const footerContactView = inView(footerContact, _toggleScrollUp);
    ref.current.instance = animate(TIMELINE_SCROLLER(scope).invisible);
    ref.current.instance.complete();

    function _toggleScrollUp() {
      ref.current.instance?.stop();

      ref.current.instance = animate(TIMELINE_SCROLLER(scope).visible);

      return () => {
        if (isTopFold(footerContact)) return;
        ref.current.instance?.stop();

        ref.current.instance = animate(TIMELINE_SCROLLER(scope).invisible);
      };
    }

    return footerContactView;
  }, []);

  return { scope };
}
