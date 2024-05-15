import { useRef } from 'react';
import { animate, stagger, type AnimationSequence } from 'framer-motion';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import gFD from '@/utils/get-framer-data';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import type { EntryStatus } from '@/types/animation-sequence';
import type { FooterEntryParam, FooterSequences, FooterSequencesSequence } from '@/types/footer';

export default function useFooterEntry(param: FooterEntryParam) {
  const { isInView } = param;
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();
  const status = useRef<EntryStatus>('not-ready');

  useIsomorphicLayoutEffect(() => {
    const contactRoot = document.querySelector(gFD('footer-contact')) as HTMLElement;
    const contentRoot = document.querySelector(gFD('footer-content')) as HTMLElement;

    if (isInView && !isLoader && status.current === 'ready') {
      contactRoot.classList.remove('invisible');
      contentRoot.classList.remove('invisible');

      animate(sequences({ status: 'running' })).then(() => {
        status.current = 'complete';
      });

      status.current = 'running';
    } else if (status.current === 'not-ready') {
      contactRoot.classList.add('overflow-hidden');
      contentRoot.classList.add('overflow-hidden');
      contentRoot.style.perspective = '5000px';

      animate(sequences({ status: 'ready' })).then(() => {
        status.current = 'ready';
      });
    }
  }, [isInView, isLoader]);
}

function sequences(param: FooterSequences): AnimationSequence {
  const { status } = param;
  const SEQUENCE: FooterSequencesSequence = {
    ready: [
      [gFD('footer-contact'), { opacity: 0 }, { duration: 0 }],
      [gFD('marquee-footer-contact'), { y: '200%' }, { duration: 0 }],
      [gFD('footer-content-section'), { y: '-10%', opacity: 0 }, { duration: 0 }],
      [gFD('footer-footer'), { y: '150%' }, { duration: 0 }],
    ],
    running: [
      [gFD('footer-contact'), { opacity: 1 }, { ...FRAMER_DEFAULT_TIMING, duration: 0.5 }],
      [gFD('marquee-footer-contact'), { y: '0%' }, { ...FRAMER_DEFAULT_TIMING, duration: 0.5 }],
      [
        gFD('footer-content-section'),
        { y: '0%', opacity: 1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, delay: stagger(0.1) },
      ],
      [gFD('footer-footer'), { y: '0%' }, { ...FRAMER_DEFAULT_TIMING, duration: 0.5 }],
    ],
  };

  return SEQUENCE[status] || [];
}
