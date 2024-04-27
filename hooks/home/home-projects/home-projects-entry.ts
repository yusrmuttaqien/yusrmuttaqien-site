import { useRef } from 'react';
import {
  useAnimate,
  useInView,
  stagger,
  type AnimationSequence,
  type AnimationPlaybackControls,
} from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import { useMediaQueryCtx } from '@/providers/media-query';
import useSplitType from '@/hooks/split-type';
import gFD from '@/utils/get-framer-data';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import type { ProjectsSequences, ProjectsSequencesSequence } from '@/types/home';
import type { EntryStatus } from '@/types/animation-sequence';

export default function useHomeProjectsEntry() {
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();
  const [scope, animate] = useAnimate();
  const { isValidated } = useMediaQueryCtx();
  const status = useRef<EntryStatus>('not-ready');
  const isInView = useInView(scope, { margin: '0% 0% -20% 0%' });
  const activeAnimate = useRef<AnimationPlaybackControls | null>(null);
  const { lastRun: titleLR, disconnect: titleOff } = useSplitType(
    `#home-projects ${gFD('projects-header-title-0')}`,
    {
      types: 'words,chars',
      wordClass: 'word overflow-hidden project-title-trim',
      charClass: 'char project-title-trim',
    }
  );
  const { lastRun: titleL2R, disconnect: title2Off } = useSplitType(
    `#home-projects ${gFD('projects-header-title-2')}`,
    {
      types: 'words,chars',
      wordClass: 'word overflow-hidden project-title-trim',
      charClass: 'char project-title-trim',
    }
  );
  const { lastRun: subtitleLR, disconnect: subtitleOff } = useSplitType(
    `#home-projects ${gFD('projects-header-subtitle')}`,
    {
      types: 'lines,words',
      lineClass: 'line whitespace-nowrap overflow-hidden',
    }
  );

  function _preEntry() {
    const root = scope.current as HTMLElement;
    const title2 = root.querySelector(gFD('projects-header-title-2')) as HTMLElement;
    const subtitle = root.querySelector(gFD('projects-header-subtitle')) as HTMLElement;
    const { marginLeft } = getComputedStyle(title2);

    title2.classList.add('inline-block');
    subtitle.classList.add('overflow-hidden');
    animate(sequences({ status: 'ready', title2ML: parseFloat(marginLeft) })).then(() => {
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
        titleOff();
        title2Off();
        subtitleOff();
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
  }, [titleLR, subtitleLR, titleL2R]);

  return scope;
}

function sequences(props: ProjectsSequences): AnimationSequence {
  const { status, title2ML = 0 } = props;
  const SEQUENCE: ProjectsSequencesSequence = {
    ready: [
      [gFD('projects-header-title', '.char'), { y: '101%' }, { duration: 0 }],
      [gFD('projects-header-title-2'), { x: -title2ML }, { duration: 0 }],
      [gFD('projects-header-subtitle', '.word'), { y: '100%' }, { duration: 0 }],
      [gFD('coc'), { opacity: 0, scale: 1.5 }, { duration: 0 }],
      [gFD('projects-projects'), { opacity: 0, y: 10 }, { duration: 0 }],
      [gFD('projects-more'), { opacity: 0, y: 10 }, { duration: 0 }],
    ],
    running: [
      [
        gFD('projects-header-title', '.char'),
        { y: '0%' },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, delay: stagger(0.05) },
      ],
      [gFD('projects-header-title-2'), { x: 0 }, { ...FRAMER_DEFAULT_TIMING, duration: 0.5 }],
      [gFD('coc'), { opacity: 1, scale: 1 }, { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '<' }],
      [
        gFD('projects-header-subtitle', '.line:first-child .word'),
        { y: '0%' },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '-0.3' },
      ],
      [
        gFD('projects-header-subtitle', '.line:last-child .word'),
        { y: '0%' },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '-0.3' },
      ],
      [
        gFD('projects-projects'),
        { opacity: 1, y: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, delay: stagger(0.1) },
      ],
      [
        gFD('projects-more'),
        { opacity: 1, y: 0 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '-0.3' },
      ],
    ],
  };

  return SEQUENCE[status] || [];
}
