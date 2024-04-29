import { useRef } from 'react';
import { useAnimate, useInView, stagger, type AnimationSequence } from 'framer-motion';
import { useMediaQueryCtx } from '@/providers/media-query';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import useSplitType from '@/hooks/split-type';
import gFD from '@/utils/get-framer-data';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import type { EntryStatus } from '@/types/animation-sequence';
import type { ScreenSize } from '@/types/tailwind-config';
import type { HowSequences, HowSequencesSequence } from '@/types/home';
import type { ResumableAnimate } from '@/types/animation-sequence';

export default function useHomeHowEntry() {
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();
  const [scope, animate] = useAnimate();
  const status = useRef<EntryStatus>('not-ready');
  const screen = useRef<ScreenSize | undefined>(undefined);
  const { isValidated, isScreenDesktop } = useMediaQueryCtx();
  const isInView = useInView(scope, { margin: '0% 0% -20% 0%' });
  const { lastRun: titleLR, disconnect: titleOff } = useSplitType({
    selector: `#home-how ${gFD('how-header-subtitle')}`,
    options: { types: 'lines,words', lineClass: 'line overflow-hidden' },
  });
  const { lastRun: subtitleLR, disconnect: subtitleOff } = useSplitType({
    selector: `#home-how ${gFD('how-header-title')}`,
    options: { types: 'lines,words', lineClass: 'line overflow-hidden' },
  });
  const activeAnimate = useRef<ResumableAnimate>({
    instance: null,
    time: 0,
  });

  function _preEntry(overrideStatus?: EntryStatus, cb?: VoidFunction) {
    const root = scope.current as HTMLElement;
    const desktopStep = root.querySelector(gFD('how-desktop-steps')) as HTMLElement;
    const mobileSteps = root.querySelectorAll(gFD('how-mobile-step'));

    if (desktopStep) {
      desktopStep.style.perspective = '5000px';
    } else if (mobileSteps.length > 0) {
      mobileSteps.forEach((step) => {
        const heading = step.children[0] as HTMLElement;
        const title = heading.children[0] as HTMLElement;
        const arrow = heading.children[1] as HTMLElement;

        heading.style.perspective = '5000px';
        heading.classList.add('overflow-hidden', 'relative', 'isolate');
        title.classList.add('relative', 'z-10', 'bg-beige-dynamic-[]');
        arrow.classList.add('z-0');
      });
    }

    animate(sequences({ status: 'ready', screen })).then(() => {
      status.current = overrideStatus || 'ready';
      cb?.();
    });
  }
  function _entry() {
    activeAnimate.current.instance?.stop();
    _preEntry('running', _reAnimate);
  }
  function _reAnimate() {
    const root = scope.current as HTMLElement;

    root.classList.remove('invisible');
    activeAnimate.current.instance = animate(sequences({ status: 'running', screen }));
    activeAnimate.current.instance.pause();
    activeAnimate.current.instance.time = activeAnimate.current.time;
    activeAnimate.current.instance.play();
    activeAnimate.current.instance.then(() => {
      status.current = 'complete';
      activeAnimate.current.time = 0;
      titleOff();
      subtitleOff();
    });
  }

  useIsomorphicLayoutEffect(() => {
    if (!isValidated) return;

    function _cover() {
      if (status.current !== 'running') return;
      const root = scope.current as HTMLElement;

      !root.classList.contains('invisible') && root.classList.add('invisible');
    }

    window.addEventListener('resize', _cover);

    if (isInView && !isLoader && status.current === 'ready') {
      _entry();

      status.current = 'running';
    } else if (status.current === 'not-ready') {
      _preEntry();
    }

    return () => {
      window.removeEventListener('resize', _cover);
    };
  }, [isInView, isLoader, isValidated]);
  useIsomorphicLayoutEffect(() => {
    screen.current = isScreenDesktop ? 'xl' : 'lg';
  }, [isScreenDesktop]);
  useIsomorphicLayoutEffect(() => {
    if (status.current === 'ready') {
      _preEntry();
    } else if (status.current === 'running') {
      const instanceTime = activeAnimate.current.instance?.time || 0;

      if (activeAnimate.current.time < instanceTime) {
        activeAnimate.current.time = instanceTime;
      }

      _entry();
    }
  }, [titleLR, subtitleLR]);

  return { scope, status };
}

function sequences(props: HowSequences): AnimationSequence {
  const { status, screen } = props;
  const currentScreen = screen.current || 'xl';
  const SHARED_SEQUENCE_READY: AnimationSequence = [
    [gFD('how-header-title', '.word'), { y: '200%' }, { duration: 0 }],
    [gFD('how-header-subtitle', '.word'), { y: '200%' }, { duration: 0 }],
  ];
  const SHARED_SEQUENCE_GO: AnimationSequence = [
    [gFD('how-header-title', '.word'), { y: '0%' }, { ...FRAMER_DEFAULT_TIMING, duration: 0.5 }],
    [
      gFD('how-header-subtitle', '.line:first-child .word'),
      { y: '0%' },
      { ...FRAMER_DEFAULT_TIMING, duration: 0.5 },
    ],
    [
      gFD('how-header-subtitle', '.line:last-child .word'),
      { y: '0%' },
      { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '-0.4' },
    ],
  ];
  const SEQUENCE: HowSequencesSequence = {
    lg: {
      ready: [
        ...SHARED_SEQUENCE_READY,
        [
          gFD('how-mobile-step', '> div h3'),
          { rotateX: -90, z: -500, y: '50%', opacity: 0 },
          { duration: 0 },
        ],
        [gFD('how-mobile-step', '> div span'), { x: '-30%', opacity: 0 }, { duration: 0 }],
        [gFD('how-mobile-step', '> figure'), { opacity: 0 }, { duration: 0 }],
      ],
      running: [
        ...SHARED_SEQUENCE_GO,
        [
          gFD('how-mobile-step', '> div h3'),
          { rotateX: 0, z: 0, y: '0%', opacity: 1 },
          {
            ...FRAMER_DEFAULT_TIMING,
            duration: 0.5,
            delay: stagger(0.1),
          },
        ],
        [
          gFD('how-mobile-step', '> div span'),
          { x: '0%', opacity: 1 },
          {
            ...FRAMER_DEFAULT_TIMING,
            duration: 0.5,
            delay: stagger(0.1),
            at: '-0.3',
          },
        ],
        [
          gFD('how-mobile-step', '> figure'),
          { opacity: 1 },
          { ...FRAMER_DEFAULT_TIMING, duration: 0.5, delay: stagger(0.2), at: '-0.5' },
        ],
      ],
    },
    xl: {
      ready: [
        ...SHARED_SEQUENCE_READY,
        [gFD('coc-command-stroke'), { opacity: 0 }, { duration: 0 }],
        [gFD('coc-options-stroke'), { opacity: 0 }, { duration: 0 }],
        [gFD('coc-control-stroke'), { opacity: 0 }, { duration: 0 }],
        [gFD('coc-command-path'), { opacity: 0 }, { duration: 0 }],
        [gFD('coc-options-path'), { opacity: 0 }, { duration: 0 }],
        [gFD('coc-control-path'), { opacity: 0 }, { duration: 0 }],
        [
          gFD('how-desktop-steps', 'button'),
          { rotateX: -90, z: -500, y: 100, opacity: 0 },
          { duration: 0 },
        ],
      ],
      running: [
        ...SHARED_SEQUENCE_GO,
        [gFD('coc-command-stroke'), { opacity: 1 }, { ...FRAMER_DEFAULT_TIMING, duration: 0.5 }],
        [gFD('coc-command-path'), { opacity: 0.2 }, { ...FRAMER_DEFAULT_TIMING, duration: 0.5 }],
        [gFD('coc-options-stroke'), { opacity: 1 }, { ...FRAMER_DEFAULT_TIMING, duration: 0.5 }],
        [gFD('coc-options-path'), { opacity: 0.2 }, { ...FRAMER_DEFAULT_TIMING, duration: 0.5 }],
        [gFD('coc-control-stroke'), { opacity: 1 }, { ...FRAMER_DEFAULT_TIMING, duration: 0.5 }],
        [gFD('coc-control-path'), { opacity: 0.2 }, { ...FRAMER_DEFAULT_TIMING, duration: 0.5 }],
        [
          gFD('how-desktop-steps', 'button'),
          { rotateX: 0, z: 0, y: 0, opacity: 0.2 },
          { ...FRAMER_DEFAULT_TIMING, duration: 1, delay: stagger(0.3), at: '-0.5' },
        ],
      ],
    },
  };

  return SEQUENCE[currentScreen]?.[status] || [];
}
