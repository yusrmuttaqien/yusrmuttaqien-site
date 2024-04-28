import { useRef } from 'react';
import { useAnimate, useInView, type AnimationSequence, stagger } from 'framer-motion';
import { useMediaQueryCtx } from '@/providers/media-query';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import useSplitType from '@/hooks/split-type';
import gFD from '@/utils/get-framer-data';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import type { EntryStatus } from '@/types/animation-sequence';
import type { ScreenSize } from '@/types/tailwind-config';
import type { HowSequences, HowSequencesSequence } from '@/types/home';

export default function useHomeHowEntry() {
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();
  const [scope, animate] = useAnimate();
  const status = useRef<EntryStatus>('not-ready');
  const { isValidated, isScreenDesktop } = useMediaQueryCtx();
  const isInView = useInView(scope, { margin: '0% 0% -20% 0%' });
  const screen = useRef<ScreenSize | undefined>(undefined);
  const { lastRun: titleLR, disconnect: titleOff } = useSplitType({
    selector: `#home-how ${gFD('how-header-subtitle')}`,
    options: { types: 'lines,words', lineClass: 'line overflow-hidden' },
  });
  const { lastRun: subtitleLR, disconnect: subtitleOff } = useSplitType({
    selector: `#home-how ${gFD('how-header-title')}`,
    options: { types: 'lines,words', lineClass: 'line overflow-hidden' },
  });

  function _preEntry() {
    const root = scope.current as HTMLElement;
    const desktopStep = root.querySelector(gFD('how-desktop-steps')) as HTMLElement;
    const mobileSteps = root.querySelectorAll(gFD('how-mobile-step'));

    if (desktopStep) {
      desktopStep.style.perspective = '5000px';
    }

    if (mobileSteps.length > 0) {
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
      status.current = 'ready';
    });
  }

  useIsomorphicLayoutEffect(() => {
    if (!isValidated) return;
    if (!screen.current) {
      screen.current = isScreenDesktop ? 'xl' : 'lg';
    }
    if (isInView && !isLoader && status.current === 'ready') {
      status.current = 'running';
      animate(sequences({ status: 'running', screen })).then(() => {
        status.current = 'complete';
        titleOff();
        subtitleOff();
      });
    } else if (status.current === 'not-ready') {
      _preEntry();
    }
  }, [isInView, isLoader, isValidated, isScreenDesktop]);
  useIsomorphicLayoutEffect(() => {
    if (!['running', 'complete'].includes(status.current)) {
      _preEntry();
    }
  }, [titleLR, subtitleLR]);

  return { scope };
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
