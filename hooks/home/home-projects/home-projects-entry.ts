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
import { PROJECTS_HEADER_TITLE_TRIM_STYLES } from '@/constants/home';
import type { ProjectsSequencesProps } from '@/types/home';
import classMerge from '@/utils/class-merge';

export default function useHomeProjectsEntry() {
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();
  const isReady = useRef(false);
  const isComplete = useRef(false);
  const [scope, animate] = useAnimate();
  const { isValidated } = useMediaQueryCtx();
  const isInView = useInView(scope, { margin: '0% 0% -20% 0%' });
  const { lastRun: titleLR, disconnect: titleOff } = useSplitType(
    `#home-projects ${gFD('projects-header-title-0')}`,
    {
      types: 'words,chars',
      wordClass: classMerge('word overflow-hidden', PROJECTS_HEADER_TITLE_TRIM_STYLES),
      charClass: classMerge('char', PROJECTS_HEADER_TITLE_TRIM_STYLES),
    }
  );
  const { lastRun: titleL2R, disconnect: title2Off } = useSplitType(
    `#home-projects ${gFD('projects-header-title-2')}`,
    {
      types: 'words,chars',
      wordClass: classMerge('word overflow-hidden', PROJECTS_HEADER_TITLE_TRIM_STYLES),
      charClass: classMerge('char', PROJECTS_HEADER_TITLE_TRIM_STYLES),
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
    animate(Sequences({ part: 'ready', title2ML: parseFloat(marginLeft) })).then(() => {
      isReady.current = true;
    });
  }

  useIsomorphicLayoutEffect(() => {
    if (!isValidated) return;
    let goInstance: AnimationPlaybackControls | null;

    if (isInView && !isLoader && !isComplete.current) {
      const root = scope.current as HTMLElement;

      root.classList.remove('invisible');
      goInstance = animate(Sequences({ part: 'go' }));
      goInstance.then(() => {
        isComplete.current = true;
        titleOff();
        title2Off();
        subtitleOff();
      });
    } else if (!isReady.current) {
      _preEntry();
    }

    return () => {
      goInstance?.complete();
    };
  }, [isInView, isLoader, isValidated]);
  useIsomorphicLayoutEffect(() => {
    if (!isComplete.current) {
      _preEntry();
    }
  }, [titleLR, subtitleLR, titleL2R]);

  return scope;
}

function Sequences({ part, title2ML = 0 }: ProjectsSequencesProps): AnimationSequence {
  const SEQUENCE: AnimationSequence[] = [
    [
      [gFD('projects-header-title', '.char'), { y: '101%' }, { duration: 0 }],
      [gFD('projects-header-title-2'), { x: -title2ML }, { duration: 0 }],
      [gFD('projects-header-subtitle', '.word'), { y: '100%' }, { duration: 0 }],
      [gFD('projects-header-coc'), { opacity: 0, scale: 1.5 }, { duration: 0 }],
      [gFD('projects-projects'), { opacity: 0, y: 10 }, { duration: 0 }],
      [gFD('projects-more'), { opacity: 0, y: 10 }, { duration: 0 }],
    ],
    [
      [
        gFD('projects-header-title', '.char'),
        { y: '0%' },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, delay: stagger(0.05) },
      ],
      [gFD('projects-header-title-2'), { x: 0 }, { ...FRAMER_DEFAULT_TIMING, duration: 0.5 }],
      [
        gFD('projects-header-coc'),
        { opacity: 1, scale: 1 },
        { ...FRAMER_DEFAULT_TIMING, duration: 0.5, at: '<' },
      ],
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
  ];

  return SEQUENCE[part === 'ready' ? 0 : 1];
}
