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
import debounce from '@/utils/debounce';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import type { MasteriesSequences, MasteriesSequencesSequence } from '@/types/home';
import type { EntryStatus } from '@/types/animation-sequence';
import type { ResumableAnimate } from '@/types/animation-sequence';

export default function useHomeMasteriesEntry() {
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();
  const { locale } = useRouter();
  const [scope, animate] = useAnimate();
  const { isValidated } = useMediaQueryCtx();
  const status = useRef<EntryStatus>('not-ready');
  const rootComputedStyle = useRef({ height: 0 });
  const isInView = useInView(scope, { margin: '0% 0% -20% 0%' });
  const { lastRun, disconnect } = useSplitType({
    selector: `#home-masteries ${gFD('section-header-title')}`,
    options: { types: 'lines', lineClass: 'line whitespace-nowrap' },
  });
  const activeAnimate = useRef<ResumableAnimate>({
    instance: null,
    time: 0,
  });

  function _preEntry() {
    const { height } = rootComputedStyle.current;

    animate(sequences({ status: 'ready', marqueeX: height })).then(() => {
      status.current = 'ready';
    });
  }
  function _entry(time: number = 0) {
    activeAnimate.current.instance?.stop();
    _preEntry();
    activeAnimate.current.instance = animate(sequences({ status: 'running' }));
    activeAnimate.current.instance.pause();
    activeAnimate.current.instance.time = time;
    activeAnimate.current.instance.play();
    activeAnimate.current.instance.then(() => {
      status.current = 'complete';
      activeAnimate.current.time = 0;
      disconnect();
    });
  }

  useIsomorphicLayoutEffect(() => {
    if (!isValidated) return;
    const debouncedMeasure = debounce(_measure, 100);

    function _measure() {
      const root = scope.current as HTMLElement;
      const { height } = getComputedStyle(root);

      rootComputedStyle.current.height = parseFloat(height);
    }

    window.addEventListener('resize', debouncedMeasure);
    _measure();

    if (isInView && !isLoader && status.current === 'ready') {
      const root = scope.current as HTMLElement;

      root.classList.remove('invisible');
      status.current = 'running';
      _entry();
    } else if (status.current === 'not-ready') {
      _preEntry();
    }

    return () => {
      window.removeEventListener('resize', debouncedMeasure);
    };
  }, [isInView, isLoader, isValidated]);
  useIsomorphicLayoutEffect(() => {
    if (!['running', 'complete'].includes(status.current)) {
      _preEntry();
    } else if (status.current === 'running') {
      const instanceTime = activeAnimate.current.instance?.time || 0;

      if (activeAnimate.current.time < instanceTime) {
        activeAnimate.current.time = instanceTime;
      }

      _entry(activeAnimate.current.time);
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
