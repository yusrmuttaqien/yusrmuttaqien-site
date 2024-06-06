import { useRef } from 'react';
import { useAnimate, useIsomorphicLayoutEffect, useScroll } from 'framer-motion';
import { useMediaQueryStore } from '@/contexts/mediaQuery';
import debounce from '@/utils/debounce';
import { TIMELINE_ACTION } from '@/components/Projects/fragments/Card/constant';
import type { AnimationResumables } from '@/types/timeline';

export function useInteractive() {
  const isAction = useRef(false);
  const [scope, animate] = useAnimate();
  const isHoverable = useMediaQueryStore((state) => state.isHoverable);
  const resumables = useRef<AnimationResumables>({ instance: null, status: 'not-ready' });
  const { scrollY } = useScroll();

  useIsomorphicLayoutEffect(() => {
    const debouncedSetCSSValues = debounce(_setCSSValues, 100);

    function _setCSSValues() {
      requestAnimationFrame(() => {
        const root = scope.current as HTMLElement;
        const infos0 = root.querySelector('#infos-0') as HTMLElement;
        const infos1 = root.querySelector('#infos-1') as HTMLElement;
        const { clientHeight: infos0Height } = infos0;
        const { clientHeight: infos1Height } = infos1;
        const { marginTop } = getComputedStyle(infos1);
        const limitTop = infos0Height + parseFloat(marginTop);
        const limitBottom = infos1Height;

        root.style.setProperty('--limit-top', `${limitTop}px`);
        root.style.setProperty('--limit-bottom', `${limitBottom}px`);
      });
    }

    window.addEventListener('resize', debouncedSetCSSValues);
    _setCSSValues();

    return () => window.removeEventListener('resize', debouncedSetCSSValues);
  }, []);
  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLElement;

    async function _closeActions() {
      if (!isAction.current) return;
      resumables.current.instance?.stop();

      resumables.current.instance = animate(TIMELINE_ACTION.invisible);
      isAction.current = false;
    }
    function _openActions() {
      const html = document.documentElement as HTMLElement;

      if (html.classList.contains('lenis-scrolling') || isAction.current) return;
      resumables.current.instance?.stop();

      resumables.current.instance = animate(TIMELINE_ACTION.visible);
      isAction.current = true;
    }

    scrollY.on('change', _closeActions);
    isHoverable && root.addEventListener('mousemove', _openActions);
    !isHoverable && root.addEventListener('click', _openActions);

    return () => {
      root.removeEventListener('mousemove', _openActions);
      root.removeEventListener('click', _openActions);
      scrollY.clearListeners();
    };
  }, [isHoverable]);

  return { scope };
}
