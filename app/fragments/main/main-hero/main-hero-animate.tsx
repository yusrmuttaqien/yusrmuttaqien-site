'use client';
// NOTE: Markup should be separated, limited by framer-motion scroll API, using useScroll for now

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { animate, inView, useScroll, type AnimationSequence } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import { useMediaQueryCtx } from '@/app/providers/media-query';
import debounce from '@/app/utils/debounce';
import classMerge from '@/app/utils/class-merge';
import { ANCHOR_HERO } from '@/app/constants/anchor';
import { ID_BLUEPRINT_CENTRE, ID_BLUEPRINT_CROSS } from '@/app/constants/blueprint';
import { MainHeroAnimateProps } from '@/app/types/main';

export default function MainHeroAnimate({ className, children }: MainHeroAnimateProps) {
  const {
    state: {
      isLoader: { enter },
    },
  } = useAnimationSequenceCtx();
  const isHeaderHidden = useRef(false);
  const { isHover } = useMediaQueryCtx();
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start', 'end start'] });

  useLayoutEffect(() => {
    let SEQUENCE: AnimationSequence = [];
    let stopObserve: VoidFunction | undefined;
    const heroEl = document.querySelector('[data-framer="main-hero"]') as HTMLElement;
    const heroHeaderEl = heroEl.getElementsByTagName('header')[0];
    const blueprintCentreEl = document.getElementById(ID_BLUEPRINT_CENTRE) as HTMLElement;
    const blueprintCrossEl = document.getElementById(ID_BLUEPRINT_CROSS) as HTMLElement;
    SEQUENCE = [
      [blueprintCrossEl, { filter: 'blur(50px)', scale: 1.5 }, { duration: 0 }],
      [blueprintCentreEl, { scale: 0.5, filter: 'blur(50px)' }, { duration: 0 }],
    ];

    const debouncedFadeinHeader = debounce(() => {
      (heroHeaderEl as HTMLElement).classList.remove('pointer-events-none');
      isHeaderHidden.current = false;
    }, 250);
    function trackMouse(e: MouseEvent) {
      requestAnimationFrame(() => {
        // TODO: Separate constraint to x and y, update accordingly based on viewport to enhance angle
        const { clientWidth, clientHeight } = document.documentElement;
        const xRotateConstraint = (clientWidth * 15) / clientWidth;
        const yRotateConstraint = (clientHeight * 15) / clientHeight;
        const target = e.target as HTMLElement;
        const xBoundaryCentre = target.offsetWidth / 20;
        const yBoundaryCentre = target.offsetHeight / 20;
        const xBoundaryCross = target.offsetWidth / 120;
        const yBoundaryCross = target.offsetHeight / 120;
        const { x, y, height, width } = blueprintCentreEl.getBoundingClientRect();
        const xMoveCentre = Math.min(
          Math.max(e.pageX - target.offsetWidth / 2, -xBoundaryCentre),
          xBoundaryCentre
        );
        const yMoveCentre = Math.min(
          Math.max(e.pageY - target.offsetHeight / 2, -yBoundaryCentre),
          yBoundaryCentre
        );
        const xMoveCross = Math.min(
          Math.max(e.pageX - target.offsetWidth / 2, -xBoundaryCross),
          xBoundaryCross
        );
        const yMoveCross = Math.min(
          Math.max(e.pageY - target.offsetHeight / 2, -yBoundaryCross),
          yBoundaryCross
        );
        const xRotate = -(e.pageY - y - height / 2) / xRotateConstraint;
        const yRotate = (e.pageX - x - width / 2) / yRotateConstraint;

        blueprintCentreEl.style.transform = `translate(${xMoveCentre}px, ${yMoveCentre}px) rotateX(${xRotate}deg) rotateY(${yRotate}deg) scale(.5)`;
        blueprintCrossEl.style.transform = `translate(${xMoveCross}px, ${yMoveCross}px)`;
        blueprintCrossEl.style.filter = `blur(10px)`;
      });
    }
    function deTrackMouse() {
      blueprintCentreEl.style.transform = 'translate(0px, 0px) rotateX(0deg) rotateY(0deg)';
      blueprintCrossEl.style.transform = 'translate(0px, 0px)';
      blueprintCrossEl.style.filter = `blur(0px)`;
      fadeinHeader();
    }
    function fadeoutHeader(e: MouseEvent) {
      requestAnimationFrame(() => {
        e.stopPropagation();

        if (isHeaderHidden.current) return;

        (heroHeaderEl as HTMLElement).classList.add(
          'transition-opacity',
          'opacity-0',
          'pointer-events-none'
        );
        isHeaderHidden.current = true;
      });
    }
    function fadeinHeader() {
      requestAnimationFrame(() => {
        (heroHeaderEl as HTMLElement).classList.remove('opacity-0');
        debouncedFadeinHeader();
      });
    }
    function dragBlueprint(e: number) {
      blueprintCentreEl.style.transform = `translateY(${e * -250}px)`;
      blueprintCentreEl.style.filter = `blur(${e * 25}px)`;
      blueprintCrossEl.style.transform = `translateY(${e * -150}px)`;
      blueprintCrossEl.style.filter = `blur(${e * 50}px)`;
    }
    function cleanup() {
      heroEl.removeEventListener('mousemove', trackMouse);
      heroEl.removeEventListener('mouseleave', deTrackMouse);
      heroHeaderEl.removeEventListener('mousemove', fadeoutHeader);
      scrollYProgress.clearListeners();
      stopObserve?.();
    }

    animate(SEQUENCE);
    blueprintCentreEl.style.perspective = '100px';
    blueprintCentreEl.classList.add(
      'origin-center',
      'transition-transform',
      'ease-out-expo',
      'duration-1000'
    );
    blueprintCrossEl.classList.add(
      'origin-center',
      'transition-[transform,_filter]',
      'ease-out-expo',
      'duration-1000'
    );

    if (!enter) {
      stopObserve = inView(heroEl, () => {
        SEQUENCE = [
          [blueprintCrossEl, { filter: 'blur(0px)', scale: 1.5 }, { delay: 0.5 }],
          [blueprintCentreEl, { scale: 1, filter: 'blur(0px)' }, { at: 0.7 }],
        ];
        animate(SEQUENCE);
        return () => stopObserve?.();
      });
    }
    if (!isHover) {
      scrollYProgress.on('change', dragBlueprint);

      return cleanup;
    }

    heroEl.addEventListener('mousemove', trackMouse);
    heroEl.addEventListener('mouseleave', deTrackMouse);
    heroHeaderEl.addEventListener('mousemove', fadeoutHeader);
    scrollYProgress.on('change', fadeinHeader);

    return cleanup;
  }, [enter, isHover]);

  return (
    <section
      data-framer="main-hero"
      id={ANCHOR_HERO.replace('/#', '')}
      ref={heroRef}
      className={classMerge(
        'h-[100svh] min-h-[25rem] w-full flex items-end relative isolate',
        'bg-beige dark:bg-grey',
        className
      )}
    >
      {children}
    </section>
  );
}
