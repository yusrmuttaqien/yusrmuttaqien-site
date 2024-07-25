import { useRef } from 'react';
import { useRouter } from 'next/router';
import {
  useIsomorphicLayoutEffect,
  useAnimate,
  animate as gAnimate,
  useScroll,
  type AnimationPlaybackControls,
} from 'framer-motion';
import useScrollLock from '@/hooks/scrollLock';
import { useTogglesStore } from '@/contexts/toggles';
import { useMediaQueryStore } from '@/contexts/mediaQueries';
import debounce from '@/utils/debounce';
import {
  TIMELINE_MAIN,
  TIMELINE_MENU,
  MENU_LOCK_ID,
} from '@/components/Navbar/fragments/Menu/constant';
import { EASE_IN_QUART, EASE_OUT_QUART } from '@/constants/motion';

export default function useVisible() {
  const { asPath } = useRouter();
  const routeCache = useRef('/');
  const blendCache = useRef(false);
  const [scope, animate] = useAnimate();
  const { scrollYProgress } = useScroll();
  const { lock, unlock } = useScrollLock();
  const isNavMenu = useTogglesStore((store) => store.isNavMenu);
  const isDarkMode = useMediaQueryStore((store) => store.isDarkMode);
  const mainTimeline = useRef<AnimationPlaybackControls>();

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLDivElement;
    const debouncedAnchorRootMain = debounce(_anchorRootMain, 50);

    function _navbarInteractive(enable: boolean) {
      const navbar = document.getElementById('navbar');
      const isRouteChange = routeCache.current !== asPath;
      const isBlend = blendCache.current;

      if (!navbar) return;
      if (enable) {
        navbar.classList.add(
          'hoverable:hover:mix-blend-normal',
          'hoverable:hover:after:bg-dynamic-[beige_95]',
          'hoverable:hover:text-dynamic-grey',
          'hoverable:hover:after:backdrop-blur-md'
        );
        !isRouteChange && isBlend && navbar.classList.add('mix-blend-difference');
      } else {
        const isBlend = navbar.classList.contains('mix-blend-difference');
        blendCache.current = isBlend;

        navbar.classList.remove(
          'hoverable:hover:mix-blend-normal',
          'hoverable:hover:after:bg-dynamic-[beige_95]',
          'hoverable:hover:text-dynamic-grey',
          'hoverable:hover:after:backdrop-blur-md',
          'mix-blend-difference'
        );
      }
    }
    async function _openSequence() {
      if (!mainTimeline.current) {
        const prepare = animate(TIMELINE_MENU(scope, isDarkMode, 'initialize').invisible);
        await prepare.complete();
      }

      root.classList.remove('invisible');
      mainTimeline.current?.stop?.();
      mainTimeline.current = gAnimate('#below-fold-main', TIMELINE_MAIN.visible, {
        ease: EASE_OUT_QUART,
      });
      animate(TIMELINE_MENU(scope, isDarkMode).visible);
    }
    async function _closeSequence() {
      if (!mainTimeline.current) return;
      const isRouteChange = routeCache.current !== asPath;

      mainTimeline.current.stop?.();

      if (isRouteChange) {
        mainTimeline.current = await gAnimate('#below-fold-main', TIMELINE_MAIN.invisible, {
          ease: EASE_IN_QUART,
        });
      } else {
        mainTimeline.current = gAnimate('#below-fold-main', TIMELINE_MAIN.invisible, {
          ease: EASE_IN_QUART,
        });
      }

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
      routeCache.current = asPath;
      _navbarInteractive(false);
      lock(MENU_LOCK_ID);
      _openSequence();
    } else {
      _closeSequence().then(() => {
        unlock(MENU_LOCK_ID);
        _navbarInteractive(true);
      });
    }

    return () => {
      scrollYProgress.clearListeners();
    };
  }, [isNavMenu, isDarkMode, asPath]);

  return { scope };
}
