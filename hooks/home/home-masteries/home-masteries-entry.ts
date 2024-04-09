import { useRef } from 'react';
import { useAnimate, useInView, stagger, inView, type AnimationSequence } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import useSplitType from '@/hooks/split-type';
import gFD from '@/utils/get-framer-data';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import type { MasteriesSequencesProps } from '@/types/home';

export default function useHomeMasteriesEntry() {
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { margin: '0% 0% -20% 0%', once: true });
  const isReady = useRef(false);

  useSplitType("#home-masteries [data-framer='section-header-title']", {
    types: 'lines',
  });

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLElement;
    const masteriesLists = root.querySelector(gFD('home-masteries-lists')) as HTMLElement;

    if (isInView && !isLoader) {
      root.classList.remove('invisible');
      animate(Sequences({ part: 'go' })).then(() => {
        const stop = inView(
          "#home-masteries [data-framer='home-masteries-list-0']",
          animateContents,
          { margin: '0% 0% -20% 0%' }
        );

        function animateContents(e: IntersectionObserverEntry) {
          if (!e.isIntersecting) return;

          stop();
          const sequence: AnimationSequence = [];

          for (let i = 0; i < masteriesLists.children.length; i++) {
            sequence.push([
              gFD(`home-masteries-list-title-${i}`),
              { opacity: 1, y: 0 },
              { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '-0.4' },
            ]);
            sequence.push([
              gFD(`home-masteries-list-contents-${i}`),
              { opacity: 1, y: 0 },
              { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '-0.4' },
            ]);
          }

          animate(sequence);
        }
      });
    } else if (!isReady.current) {
      const extraSequence: AnimationSequence = [];
      const { height } = getComputedStyle(root);

      for (let i = 0; i < masteriesLists.children.length; i++) {
        extraSequence.push([
          gFD(`home-masteries-list-title-${i}`),
          { opacity: 0, y: 20 },
          { duration: 0 },
        ]);
        extraSequence.push([
          gFD(`home-masteries-list-contents-${i}`),
          { opacity: 0, y: 20 },
          { duration: 0 },
        ]);
      }

      animate(Sequences({ part: 'ready', extraSequence, marqueeX: parseFloat(height) })).then(
        () => {
          isReady.current = true;
        }
      );
    }
  }, [isInView, isLoader]);

  return scope;
}

function Sequences({
  part,
  extraSequence = [],
  marqueeX,
}: MasteriesSequencesProps): AnimationSequence {
  const SEQUENCE: AnimationSequence[] = [
    [
      [
        gFD('home-masteries-marquee-positive'),
        { opacity: 0, x: -(marqueeX || 0) },
        { duration: 0 },
      ],
      [gFD('home-masteries-marquee-negative'), { opacity: 0, x: marqueeX }, { duration: 0 }],
      [gFD('section-header-subtitle'), { opacity: 0, y: 10 }, { duration: 0 }],
      [gFD('section-header-title', '.line'), { opacity: 0, y: 10 }, { duration: 0 }],
    ],
    [
      [
        gFD('home-masteries-marquee-positive'),
        { opacity: 1, x: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1 },
      ],
      [
        gFD('home-masteries-marquee-negative'),
        { opacity: 1, x: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 1, at: '<' },
      ],
      [
        gFD('section-header-subtitle'),
        { opacity: 1, y: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5 },
      ],
      [
        gFD('section-header-title', '.line'),
        { opacity: 1, y: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, delay: stagger(0.2), at: '-0.3' },
      ],
    ],
  ];

  return [...(part === 'ready' ? SEQUENCE[0] : SEQUENCE[1]), ...extraSequence];
}
