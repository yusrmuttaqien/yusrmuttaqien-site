import { useRef } from 'react';
import { useAnimate, useInView, stagger, type AnimationSequence } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import { useMediaQueryCtx } from '@/providers/media-query';
import useSplitType from '@/hooks/split-type';
import gFD from '@/utils/get-framer-data';
import debounce from '@/utils/debounce';
import { FRAMER_DEFAULT_TIMING } from '@/constants/framer-motion';
import type { ProjectsSequences, ProjectsSequencesSequence } from '@/types/home';
import type { EntryStatus } from '@/types/animation-sequence';
import type { ResumableAnimate } from '@/types/animation-sequence';

export default function useHomeProjectsEntry() {
  const {
    state: { isLoader },
  } = useAnimationSequenceCtx();
  const [scope, animate] = useAnimate();
  const { isValidated } = useMediaQueryCtx();
  const status = useRef<EntryStatus>('not-ready');
  const title2ComputedStyle = useRef({ marginLeft: 0 });
  const isInView = useInView(scope, { margin: '0% 0% -20% 0%' });
  const { lastRun: titleLR, disconnect: titleOff } = useSplitType({
    selector: `#home-projects ${gFD('projects-header-title')} > span`,
    options: {
      types: 'words,chars',
      wordClass: 'word overflow-hidden project-title-trim',
      charClass: 'char project-title-trim',
    },
  });
  const { lastRun: subtitleLR, disconnect: subtitleOff } = useSplitType({
    selector: `#home-projects ${gFD('projects-header-subtitle')}`,
    options: { types: 'lines,words', lineClass: 'line whitespace-nowrap overflow-hidden' },
  });
  const activeAnimate = useRef<ResumableAnimate>({
    instance: null,
    time: 0,
  });

  function _preEntry(overrideStatus?: EntryStatus, cb?: VoidFunction) {
    const { marginLeft } = title2ComputedStyle.current;

    animate(sequences({ status: 'ready', title2ML: marginLeft })).then(() => {
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
    activeAnimate.current.instance = animate(sequences({ status: 'running' }));
    activeAnimate.current.instance.pause();
    activeAnimate.current.instance.time = activeAnimate.current.time;
    activeAnimate.current.instance.play();
    activeAnimate.current.instance.then(() => {
      status.current = 'complete';
      titleOff();
      subtitleOff();
    });
  }

  useIsomorphicLayoutEffect(() => {
    if (!isValidated) return;
    const debouncedMeasure = debounce(_measure, 100);

    function _measure() {
      const root = scope.current as HTMLElement;
      const title2 = root.querySelector(gFD('projects-header-title-2')) as HTMLElement;
      const { marginLeft } = getComputedStyle(title2);

      title2ComputedStyle.current.marginLeft = parseFloat(marginLeft);
    }
    function _cover() {
      if (status.current !== 'running') return;
      const root = scope.current as HTMLElement;

      !root.classList.contains('invisible') && root.classList.add('invisible');
    }

    window.addEventListener('resize', debouncedMeasure);
    window.addEventListener('resize', _cover);

    if (isInView && !isLoader && status.current === 'ready') {
      _entry();

      status.current = 'running';
    } else if (status.current === 'not-ready') {
      const root = scope.current as HTMLElement;
      const title2 = root.querySelector(gFD('projects-header-title-2')) as HTMLElement;
      const subtitle = root.querySelector(gFD('projects-header-subtitle')) as HTMLElement;

      _measure();
      title2.classList.add('inline-block');
      subtitle.classList.add('overflow-hidden');
      _preEntry();
    }

    return () => {
      window.removeEventListener('resize', debouncedMeasure);
      window.removeEventListener('resize', _cover);
    };
  }, [isInView, isLoader, isValidated]);
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

  return { scope };
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
