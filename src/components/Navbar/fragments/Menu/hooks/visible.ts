import { useRef } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import {
  useIsomorphicLayoutEffect,
  useAnimate,
  cubicBezier,
  animate as gAnimate,
  useScroll,
  type AnimationPlaybackControls,
} from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';
import { useMediaQueryStore } from '@/contexts/mediaQuery';
import debounce from '@/utils/debounce';
import { TIMELINE_MAIN, TIMELINE_MENU } from '@/components/Navbar/fragments/Menu/constant';

const MAIN_TRANSITION = { ease: cubicBezier(0.25, 1, 0.5, 1) };

export default function useVisible() {
  const [scope, animate] = useAnimate();
  const lenis = useLenis();
  const { scrollYProgress } = useScroll();
  const isNavMenu = useTogglesStore((store) => store.isNavMenu);
  const isDarkMode = useMediaQueryStore((store) => store.isDarkMode);
  const mainTimeline = useRef<AnimationPlaybackControls>();

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLDivElement;
    const debouncedAnchorRootMain = debounce(_anchorRootMain, 50);

    function _navbarInteractive(enable: boolean) {
      const navbar = document.getElementById('navbar');

      if (!navbar) return;
      if (enable) {
        navbar.classList.add(
          'hoverable:hover:mix-blend-normal',
          'hoverable:hover:after:bg-dynamic-[beige_95]',
          'hoverable:hover:text-dynamic-grey',
          'hoverable:hover:after:backdrop-blur-md'
        );
      } else {
        navbar.classList.remove(
          'hoverable:hover:mix-blend-normal',
          'hoverable:hover:after:bg-dynamic-[beige_95]',
          'hoverable:hover:text-dynamic-grey',
          'hoverable:hover:after:backdrop-blur-md'
        );
      }
    }
    async function _openSequence() {
      if (!mainTimeline.current) {
        const prepare = animate(TIMELINE_MENU(scope, isDarkMode, 'initialize').invisible);
        await prepare.complete();
      }

      root.classList.remove('invisible');
      mainTimeline.current?.stop();
      mainTimeline.current = gAnimate('#below-fold-main', TIMELINE_MAIN.visible, MAIN_TRANSITION);
      animate(TIMELINE_MENU(scope, isDarkMode).visible);
    }
    function _closeSequence() {
      if (!mainTimeline.current) return;

      mainTimeline.current.stop();
      mainTimeline.current = gAnimate('#below-fold-main', TIMELINE_MAIN.invisible, MAIN_TRANSITION);
      return animate(TIMELINE_MENU(scope, isDarkMode, 'animate').invisible).then(() => {
        root.classList.add('invisible');

        const cleanup = animate(TIMELINE_MENU(scope, isDarkMode, 'initialize').invisible);
        cleanup.complete();
      });
    }
    function _anchorRootMain(v: number) {
      const rootMain = document.getElementById('root-main') as HTMLDivElement;

      rootMain.style.perspectiveOrigin = `center ${v * 100}%`;
    }

    scrollYProgress.on('change', debouncedAnchorRootMain);
    _anchorRootMain(scrollYProgress.get());

    if (isNavMenu) {
      _navbarInteractive(false);
      lenis?.stop();
      _openSequence();
    } else {
      _closeSequence()?.then(() => {
        lenis?.start();
        _navbarInteractive(true);
      });
    }

    return () => {
      scrollYProgress.clearListeners();
    };
  }, [isNavMenu, isDarkMode]);

  return { scope };
}
