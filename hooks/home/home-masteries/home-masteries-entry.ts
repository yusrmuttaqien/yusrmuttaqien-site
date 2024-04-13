import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useAnimate, useInView, stagger, inView, type AnimationSequence } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import { useMediaQueryCtx } from '@/providers/media-query';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import useSplitType from '@/hooks/split-type';
import gFD from '@/utils/get-framer-data';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import type { MasteriesSequencesProps } from '@/types/home';

export default function useHomeMasteriesEntry() {
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();
  const { locale } = useRouter();
  const isReady = useRef(false);
  const isComplete = useRef(false);
  const [scope, animate] = useAnimate();
  const { isBruteCheck } = useMediaQueryCtx();
  const isInView = useInView(scope, { margin: '0% 0% -20% 0%' });
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

    animate(Sequences({ part: 'ready', extraSequence, marqueeX: parseFloat(height) })).then(() => {
      isReady.current = true;
    });
  }

  useIsomorphicLayoutEffect(() => {
    if (!isBruteCheck) return;
    if (isInView && !isLoader && !isComplete.current) {
      const root = scope.current as HTMLElement;
      const masteriesLists = root.querySelector(gFD('masteries-lists')) as HTMLElement;

      root.classList.remove('invisible');
      animate(Sequences({ part: 'go' })).then(() => {
        isComplete.current = true;
        disconnect();
        const stop = inView("#home-masteries [data-framer='masteries-list-0']", animateContents, {
          margin: '0% 0% -20% 0%',
        });

        function animateContents(e: IntersectionObserverEntry) {
          if (!e.isIntersecting) return;

          stop();
          const sequence: AnimationSequence = [];

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
    } else if (!isReady.current) {
      _preEntry();
    }
  }, [isInView, isLoader, isBruteCheck]);
  useIsomorphicLayoutEffect(() => {
    if (!isComplete.current) {
      _preEntry();
    }
  }, [lastRun, locale]);

  return scope;
}

function Sequences({
  part,
  extraSequence = [],
  marqueeX = 0,
}: MasteriesSequencesProps): AnimationSequence {
  const SEQUENCE: AnimationSequence[] = [
    [
      [gFD('masteries-marquee-positive'), { opacity: 0, x: -marqueeX }, { duration: 0 }],
      [gFD('masteries-marquee-negative'), { opacity: 0, x: marqueeX }, { duration: 0 }],
      [gFD('section-header-subtitle'), { opacity: 0, y: 10 }, { duration: 0 }],
      [gFD('section-header-title', '.line'), { opacity: 0, y: 10 }, { duration: 0 }],
    ],
    [
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
  ];

  return [...SEQUENCE[part === 'ready' ? 0 : 1], ...extraSequence];
}
