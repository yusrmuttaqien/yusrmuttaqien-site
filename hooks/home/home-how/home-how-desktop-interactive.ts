import { useRef, useState } from 'react';
import { useAnimate, useAnimation, animate as globalAnimate } from 'framer-motion';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import { useMediaQueryCtx } from '@/providers/media-query';
import gFD from '@/utils/get-framer-data';
import moveTo from '@/utils/move-to';
import debounce from '@/utils/debounce';
import type { HowDesktopInteractiveProps } from '@/types/home';
import type { HowSteps } from '@/types/content';

export default function useHomeHowDesktopInteractive(props: HowDesktopInteractiveProps) {
  const { root: parent } = props;
  const control = useAnimation();
  const [scope, animate] = useAnimate();
  const rootBounding = useRef({ top: 0, height: 0 });
  const { isHover, isScreenDesktop } = useMediaQueryCtx();
  const [active, setActive] = useState<keyof HowSteps | undefined>(undefined);
  const lastEl = useRef<HTMLButtonElement | undefined>(undefined);
  const currentEl = useRef<HTMLButtonElement | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    const parentRoot = parent.current as HTMLElement;
    const root = scope.current as HTMLElement;
    const cocSteps = root.querySelectorAll('button');
    const debouncedMeasure = debounce(_measure, 100);

    function _moveCard(e: MouseEvent) {
      const current = e.target as HTMLButtonElement;
      const { scrollY } = window;
      const { top: rootTop, height: rootHeight } = rootBounding.current;
      const { top, height } = current.getBoundingClientRect();
      const yMoveCard = moveTo({
        anchor: scrollY + top + height / 2,
        preoffset: scrollY + rootTop,
        offset: rootHeight,
        boundary: rootHeight / 4,
      });

      control.start({ y: yMoveCard, transition: { duration: 0.3 } });
    }
    function _enter(e: MouseEvent) {
      const current = e.target as HTMLButtonElement;
      const innerContent = current.innerHTML.toLowerCase().replace('.', '');

      animate(current, { opacity: 0.6 });
      animate(
        gFD(`how-card-desktop-${innerContent}-img`),
        { scale: 1, zIndex: 2 },
        { duration: 0 }
      ).then(() => {
        animate(gFD(`how-card-desktop-${innerContent}-img`), { y: '0%' }, { duration: 0.3 });
      });
      animate(
        gFD(`how-card-desktop-${innerContent}-desc`),
        { opacity: 1 },
        { duration: 0.3, delay: 0.2 }
      );

      isScreenDesktop && globalAnimate(cocPath(innerContent), { opacity: 0.6 });
      setActive(innerContent as keyof HowSteps);
      _moveCard(e);

      currentEl.current = current;
    }
    function _leave(current: HTMLButtonElement) {
      const innerContent = lastEl.current?.innerHTML.toLowerCase().replace('.', '');
      const el = parentRoot?.querySelector(cocPath(innerContent || ''));
      const cardDesktopEl = root.querySelector(gFD(`how-card-desktop-${innerContent}-img`));

      lastEl.current?.removeAttribute('style');
      el && isScreenDesktop && globalAnimate(el, { opacity: 0.2 });

      if (cardDesktopEl) {
        animate(cardDesktopEl, { y: '101%', scale: 0, zIndex: 1 }, { duration: 0.6 });
        animate(gFD(`how-card-desktop-${innerContent}-desc`), { opacity: 0 }, { duration: 0.2 });
      }

      lastEl.current = current;
    }
    function _switch(e: MouseEvent) {
      const current = e.target as HTMLButtonElement;

      _enter(e);
      lastEl.current?.innerText !== current.innerText && _leave(current);
    }
    function _measure() {
      requestAnimationFrame(() => {
        const { top, height } = root.getBoundingClientRect();

        rootBounding.current = { top, height };
      });
    }

    window.addEventListener('resize', debouncedMeasure);
    _measure();

    if (isHover) {
      cocSteps.forEach((button) => button.addEventListener('mouseenter', _switch));
    } else {
      cocSteps.forEach((button) => button.addEventListener('click', _switch));
    }

    cocSteps.forEach((button) => {
      const innerContent = button.innerHTML.toLowerCase().replace('.', '');
      const el = parentRoot?.querySelector(cocPath(innerContent));
      const cardDesktopEl = root.querySelector(gFD(`how-card-desktop-${innerContent}-img`));
      lastEl.current = undefined;
      currentEl.current = undefined;

      el && globalAnimate(el, { opacity: 0.2 });
      button.removeAttribute('style');

      if (cardDesktopEl) {
        animate(cardDesktopEl, { y: '101%', zIndex: 3 });
        animate(gFD(`how-card-desktop-${innerContent}-desc`), { opacity: 0 });
      }
    });

    return () => {
      cocSteps.forEach((button) => button.removeEventListener('mouseenter', _switch));
      cocSteps.forEach((button) => button.removeEventListener('click', _switch));
      window.removeEventListener('resize', debouncedMeasure);
    };
  }, [isHover, isScreenDesktop]);

  return { scope, active, control };
}

function cocPath(step: string) {
  return '#home-how ' + gFD(`coc-${step}-path`);
}
