import { useRef, useState, type RefObject } from 'react';
import { useAnimate, useAnimation, animate as globalAnimate } from 'framer-motion';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import { useMediaQueryCtx } from '@/providers/media-query';
import gFD from '@/utils/get-framer-data';
import moveTo from '@/utils/move-to';
import type { HowSteps } from '@/types/content';

export default function useHomeHowDesktopInteractive(rootRef: RefObject<HTMLDivElement>) {
  const control = useAnimation();
  const [scope, animate] = useAnimate();
  const { isHover, isScreenDesktop } = useMediaQueryCtx();
  const [active, setActive] = useState<keyof HowSteps | undefined>(undefined);
  const lastEl = useRef<HTMLButtonElement | undefined>(undefined);
  const currentEl = useRef<HTMLButtonElement | undefined>(undefined);

  function cocSelect(step: string) {
    return '#home-how ' + gFD(`coc-${step}-path`);
  }

  useIsomorphicLayoutEffect(() => {
    const parentRoot = rootRef.current as HTMLElement;
    const root = scope.current as HTMLElement;
    const cocSteps = root.querySelectorAll('button');

    function moveCard(e: MouseEvent) {
      const current = e.target as HTMLButtonElement;
      const { scrollY } = window;
      const { top: rootTop, height: rootHeight } = root.getBoundingClientRect();
      const { top, height } = current.getBoundingClientRect();
      const yMoveCard = moveTo({
        anchor: scrollY + top + height / 2,
        preoffset: scrollY + rootTop,
        offset: rootHeight,
        boundary: rootHeight / 4,
      });

      control.start({ y: yMoveCard, transition: { duration: 0.3 } });
    }
    function activeEnter(current: HTMLButtonElement, innerContent: string, e: MouseEvent) {
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
        { duration: 0.3, delay: 0.4 }
      );

      isScreenDesktop && globalAnimate(cocSelect(innerContent), { opacity: 0.6 });
      setActive(innerContent as keyof HowSteps);
      moveCard(e);

      currentEl.current = current;
    }
    function activeLeave(current: HTMLButtonElement) {
      const innerContent = lastEl.current?.innerHTML.toLowerCase().replace('.', '');
      const el = parentRoot?.querySelector(cocSelect(innerContent || ''));
      const cardDesktopEl = root.querySelector(gFD(`how-card-desktop-${innerContent}-img`));

      lastEl.current?.removeAttribute('style');
      el && isScreenDesktop && globalAnimate(el, { opacity: 0.2 });

      if (cardDesktopEl) {
        animate(cardDesktopEl, { y: '101%', scale: 0, zIndex: 1 }, { duration: 0.6 });
        animate(gFD(`how-card-desktop-${innerContent}-desc`), { opacity: 0 }, { duration: 0.3 });
      }

      lastEl.current = current;
    }
    function switchActive(e: MouseEvent) {
      const current = e.target as HTMLButtonElement;
      const innerContent = current.innerHTML.toLowerCase().replace('.', '');

      activeEnter(current, innerContent, e);
      lastEl.current?.innerText !== current.innerText && activeLeave(current);
    }

    if (isHover) {
      cocSteps.forEach((button) => button.addEventListener('mouseenter', switchActive));
    } else {
      cocSteps.forEach((button) => button.addEventListener('click', switchActive));
    }

    cocSteps.forEach((button) => {
      const innerContent = button.innerHTML.toLowerCase().replace('.', '');
      const el = parentRoot?.querySelector(cocSelect(innerContent));
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
      cocSteps.forEach((button) => button.removeEventListener('mouseenter', switchActive));
      cocSteps.forEach((button) => button.removeEventListener('click', switchActive));
    };
  }, [isHover, isScreenDesktop]);

  return { scope, active, control };
}
