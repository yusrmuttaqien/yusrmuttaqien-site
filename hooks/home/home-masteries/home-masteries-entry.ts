import { useRef } from 'react';
import { useRouter } from 'next/router';
import {
  useAnimate,
  useInView,
  stagger,
  type AnimationSequence,
  type AnimationPlaybackControls,
} from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import { useMediaQueryCtx } from '@/providers/media-query';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import useSplitType from '@/hooks/split-type';
import gFD from '@/utils/get-framer-data';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import type { MasteriesSequences, MasteriesSequencesSequence } from '@/types/home';
import type { EntryStatus } from '@/types/animation-sequence';

export default function useHomeMasteriesEntry() {
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();
  const { locale } = useRouter();
  const [scope, animate] = useAnimate();
  const { isValidated } = useMediaQueryCtx();
  const status = useRef<EntryStatus>('not-ready');
  const isInView = useInView(scope, { margin: '0% 0% -20% 0%' });
  const activeAnimate = useRef<AnimationPlaybackControls | null>(null);
  const { lastRun, disconnect } = useSplitType({
    selector: `#home-masteries ${gFD('section-header-title')}`,
    options: { types: 'lines', lineClass: 'line whitespace-nowrap' },
  });

  function _preEntry() {
    const root = scope.current as HTMLElement;
    const { height } = getComputedStyle(root);

    animate(sequences({ status: 'ready', marqueeX: parseFloat(height) })).then(() => {
      status.current = 'ready';
    });
  }

  useIsomorphicLayoutEffect(() => {
    if (!isValidated) return;

    function _complete() {
      if (status.current === 'complete') return;

      activeAnimate.current?.complete();
      window.removeEventListener('resize', _complete);
    }

    if (isInView && !isLoader && status.current === 'ready') {
      const root = scope.current as HTMLElement;

      root.classList.remove('invisible');
      status.current = 'running';
      activeAnimate.current = animate(sequences({ status: 'running' }));
      activeAnimate.current?.then(() => {
        status.current = 'complete';
        disconnect();
      });
    } else if (status.current === 'not-ready') {
      _preEntry();
    }

    window.addEventListener('resize', _complete);

    return _complete;
  }, [isInView, isLoader, isValidated]);
  useIsomorphicLayoutEffect(() => {
    if (!['running', 'complete'].includes(status.current)) {
      _preEntry();
    }
  }, [lastRun, locale]);

  return { scope };
}

function sequences(props: MasteriesSequences): AnimationSequence {
  const { status, marqueeX = 0 } = props;
  const SEQUENCE: MasteriesSequencesSequence = {
    ready: [
      [gFD('masteries-marquee-positive'), { opacity: 0, x: -marqueeX }, { duration: 0 }],
      [gFD('masteries-marquee-negative'), { opacity: 0, x: marqueeX }, { duration: 0 }],
      [gFD('section-header-subtitle'), { opacity: 0, y: 10 }, { duration: 0 }],
      [gFD('section-header-title', '.line'), { opacity: 0, y: 10 }, { duration: 0 }],
      [gFD('masteries-list-title'), { opacity: 0, y: 10 }, { duration: 0 }],
      [gFD('masteries-list-contents'), { opacity: 0, y: 10 }, { duration: 0 }],
    ],
    running: [
      [
        gFD('masteries-marquee-positive'),
        { opacity: 1, x: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.8 },
      ],
      [
        gFD('masteries-marquee-negative'),
        { opacity: 1, x: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.8, at: '<' },
      ],
      [
        gFD('section-header-subtitle'),
        { opacity: 1, y: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '-0.7' },
      ],
      [
        gFD('section-header-title', '.line'),
        { opacity: 1, y: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, delay: stagger(0.2), at: '-0.3' },
      ],
      [
        gFD('masteries-list-title'),
        { opacity: 1, y: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, delay: stagger(0.2), at: '-0.3' },
      ],
      [
        gFD('masteries-list-contents'),
        { opacity: 1, y: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, delay: stagger(0.2), at: '-0.6' },
      ],
    ],
  };

  return SEQUENCE[status] || [];
}
