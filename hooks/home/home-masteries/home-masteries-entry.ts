import { useRef } from 'react';
import { useRouter } from 'next/router';
import {
  useAnimate,
  useInView,
  stagger,
  inView,
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
  const { lastRun, disconnect } = useSplitType(`#home-masteries ${gFD('section-header-title')}`, {
    types: 'lines',
    lineClass: 'line whitespace-nowrap',
  });

  function _preEntry() {
    const root = scope.current as HTMLElement;
    const masteriesLists = root.querySelector(gFD('masteries-lists')) as HTMLElement;
    const extraSequence: AnimationSequence = [];
    const { height } = getComputedStyle(root);

    for (let i = 0; i < masteriesLists.children.length; i++) {
      extraSequence.push([
        gFD(`masteries-list-title-${i}`),
        { opacity: 0, y: 20 },
        { duration: 0 },
      ]);
      extraSequence.push([
        gFD(`masteries-list-contents-${i}`),
        { opacity: 0, y: 20 },
        { duration: 0 },
      ]);
    }

    animate(sequences({ status: 'ready', extraSequence, marqueeX: parseFloat(height) })).then(
      () => {
        status.current = 'ready';
      }
    );
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
      const masteriesLists = root.querySelector(gFD('masteries-lists')) as HTMLElement;

      root.classList.remove('invisible');
      status.current = 'running';
      activeAnimate.current = animate(sequences({ status: 'running' }));
      activeAnimate.current?.then(() => {
        status.current = 'complete';
        disconnect();
        const stop = inView(`#home-masteries ${gFD('masteries-list-0')}`, _animateContent, {
          margin: '0% 0% -20% 0%',
        });

        function _animateContent(e: IntersectionObserverEntry) {
          if (!e.isIntersecting) return;
          const sequence: AnimationSequence = [];

          stop();

          for (let i = 0; i < masteriesLists.children.length; i++) {
            sequence.push([
              gFD(`masteries-list-title-${i}`),
              { opacity: 1, y: 0 },
              { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '-0.4' },
            ]);
            sequence.push([
              gFD(`masteries-list-contents-${i}`),
              { opacity: 1, y: 0 },
              { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '-0.4' },
            ]);
          }

          animate(sequence);
        }
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
  const { status, extraSequence = [], marqueeX = 0 } = props;
  const SEQUENCE: MasteriesSequencesSequence = {
    ready: [
      [gFD('masteries-marquee-positive'), { opacity: 0, x: -marqueeX }, { duration: 0 }],
      [gFD('masteries-marquee-negative'), { opacity: 0, x: marqueeX }, { duration: 0 }],
      [gFD('section-header-subtitle'), { opacity: 0, y: 10 }, { duration: 0 }],
      [gFD('section-header-title', '.line'), { opacity: 0, y: 10 }, { duration: 0 }],
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
    ],
  };

  return [...(SEQUENCE[status] || []), ...extraSequence];
}
