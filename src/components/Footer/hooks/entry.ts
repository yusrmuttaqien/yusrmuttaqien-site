import { useRef } from 'react';
import {
  useAnimate,
  useIsomorphicLayoutEffect,
  useInView,
  animate as gAnimate,
} from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';
import { TIMELINE_ENTRY_CONTACT, TIMELINE_ENTRY_FOOTER } from '@/components/Footer/constant';
import isBottomFold from '@/utils/isBottomFold';
import { EASE_OUT_QUART } from '@/constants/motion';
import type { AnimationResumables } from '@/types/timeline';

export default function useEntry() {
  const [scope, animate] = useAnimate();
  const contactWrapperScope = useRef<HTMLDivElement>(null);
  const inView = useInView(contactWrapperScope, { once: true });
  const isLoader = useTogglesStore((state) => state.isLoader);
  const resumables = useRef<AnimationResumables>({ instance: null, status: 'not-ready' });

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLElement;
    const contact = document.getElementById('footer-contact') as HTMLElement;
    const contactWrapper = contactWrapperScope.current as HTMLElement;
    const status = resumables.current.status;

    async function _startSequence(complete: boolean = false) {
      resumables.current.status = 'preparing';
      const prepareContact = gAnimate('#footer-contact', TIMELINE_ENTRY_CONTACT.invisible);
      const prepareFooter = animate(TIMELINE_ENTRY_FOOTER.invisible);

      prepareContact.complete();
      prepareFooter.complete();
      contact.classList.remove('invisible');
      root.classList.remove('invisible');

      resumables.current.status = 'running';
      prepareFooter.then(async () => {
        if (complete) {
          resumables.current.instance = gAnimate('#footer-contact', TIMELINE_ENTRY_CONTACT.visible);
          resumables.current.instance?.complete();
          resumables.current.instance = animate(TIMELINE_ENTRY_FOOTER.visible);
          resumables.current.instance?.complete();
        } else {
          resumables.current.instance = await gAnimate(
            '#footer-contact',
            TIMELINE_ENTRY_CONTACT.visible,
            { ease: EASE_OUT_QUART, delay: 0.1 }
          );
          resumables.current.instance = await animate(TIMELINE_ENTRY_FOOTER.visible);
          resumables.current.status = 'complete';
        }
      });
    }

    if (!isLoader && inView && (status === 'not-ready' || status === 'preparing')) {
      _startSequence();
    } else if (!isLoader && isBottomFold(contactWrapper)) {
      _startSequence(true);
    }
  }, [isLoader, inView]);

  return { scope, contactWrapperScope };
}
