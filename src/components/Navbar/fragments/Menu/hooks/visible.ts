import { useRef } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import {
  useIsomorphicLayoutEffect,
  useAnimate,
  animate as gAnimate,
  type AnimationPlaybackControls,
} from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';
import { TIMELINE_MAIN, TIMELINE_MENU } from '@/components/Navbar/fragments/Menu/constant';

export default function useVisible() {
  const [scope, animate] = useAnimate();
  const lenis = useLenis();
  const isNavMenu = useTogglesStore((store) => store.isNavMenu);
  const mainTimeline = useRef<AnimationPlaybackControls>();

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLDivElement;

    function _cursorAnimate(enable: boolean) {
      const cursor = document.getElementById('cursor');

      if (!cursor) return;
      if (enable) {
        cursor.classList.add('transition-[transform_opacity]', 'ease-linear', 'duration-[50ms]');
      } else {
        cursor.classList.remove('transition-[transform_opacity]', 'ease-linear', 'duration-[50ms]');
      }
    }
    function _padScrollbar(apply: boolean) {
      const html = document.documentElement;
      const padding = `${window.innerWidth - html.clientWidth}px`;

      _cursorAnimate(false);
      if (apply) {
        html.style.paddingRight = padding;
        html.style.setProperty('--pad-scrollbar', padding);
      } else {
        html.style.paddingRight = '';
        html.style.setProperty('--pad-scrollbar', '0px');
      }
      requestAnimationFrame(() => _cursorAnimate(true));
    }
    async function _openSequence() {
      if (!mainTimeline.current) {
        const prepare = animate(TIMELINE_MENU(scope, 'initialize').invisible);
        await prepare.complete();
      }

      root.classList.remove('invisible');
      mainTimeline.current?.stop();
      mainTimeline.current = gAnimate('main', TIMELINE_MAIN.visible);
      animate(TIMELINE_MENU(scope).visible);
    }
    function _closeSequence() {
      if (!mainTimeline.current) return;

      mainTimeline.current.stop();
      mainTimeline.current = gAnimate('main', TIMELINE_MAIN.invisible);
      return animate(TIMELINE_MENU(scope, 'animate').invisible).then(() => {
        root.classList.add('invisible');

        const cleanup = animate(TIMELINE_MENU(scope, 'initialize').invisible);
        cleanup.complete();
      });
    }

    if (isNavMenu) {
      _padScrollbar(true);
      lenis?.stop();
      _openSequence();
    } else {
      _closeSequence()?.then(() => {
        lenis?.start();
        _padScrollbar(false);
      });
    }
  }, [isNavMenu]);

  return { scope };
}
