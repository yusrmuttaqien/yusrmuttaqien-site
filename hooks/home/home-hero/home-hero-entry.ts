import { useState } from 'react';
import { useAnimate, useInView, type AnimationSequence } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import gFD from '@/utils/get-framer-data';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import type { HeroSequences, HeroSequencesSequence } from '@/types/home';
import type { EntryStatus } from '@/types/animation-sequence';

export default function useHomeHeroEntry() {
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const [status, setStatus] = useState<EntryStatus>('not-ready');

  useIsomorphicLayoutEffect(() => {
    if (isInView && !isLoader && status === 'ready') {
      setStatus('running');
      const root = scope.current as HTMLElement;

      root.classList.add('overflow-hidden');
      root.classList.remove('opacity-0');
      animate(sequences({ status: 'running' })).then(() => {
        setStatus('complete');
      });
    } else if (status === 'not-ready') {
      animate(sequences({ status: 'ready' })).then(() => {
        setStatus('ready');
      });
    }
  }, [isInView, isLoader, status]);

  return { scope, status };
}

function sequences(props: HeroSequences): AnimationSequence {
  const { status } = props;
  const SEQUENCE: HeroSequencesSequence = {
    ready: [
      [gFD('blueprint-cross'), { opacity: 0, scale: 0.5 }, { duration: 0 }],
      [gFD('blueprint-centre-inner'), { opacity: 0, scale: 0 }, { duration: 0 }],
      [gFD('blueprint-centre-outer'), { opacity: 0, scale: 0 }, { duration: 0 }],
      [gFD('hero-header'), { y: '99%' }, { duration: 0 }],
    ],
    running: [
      [
        gFD('blueprint-centre-outer'),
        { opacity: 1, scale: 1.1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.25' },
      ],
      [
        gFD('blueprint-centre-inner'),
        { opacity: 1, scale: 1.1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.8' },
      ],
      [
        gFD('blueprint-cross'),
        { opacity: 1, scale: 1.5 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.5' },
      ],
      [
        gFD('blueprint-centre-outer'),
        { opacity: 1, scale: 1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.7' },
      ],
      [
        gFD('blueprint-centre-inner'),
        { opacity: 1, scale: 1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '-0.8' },
      ],
      [gFD('hero-header'), { y: '0%' }, { ...FRAMER_DEFAULT_TIMING, duration: 0.3, at: '-0.7' }],
    ],
  };

  return SEQUENCE[status] || [];
}
