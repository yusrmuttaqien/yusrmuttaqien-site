'use client';

import { useLayoutEffect } from 'react';
import { animate, stagger, type AnimationSequence } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';

export default function NavbarAnimate() {
  const {
    state: {
      isLoader: { enter },
    },
  } = useAnimationSequenceCtx();

  useLayoutEffect(() => {
    let SEQUENCE: AnimationSequence = [];
    const navLocEl = document.querySelector('[data-framer="nav-loc"]') as Element;
    const navSepEl = document.querySelector('[data-framer="nav-sep"]') as Element;
    const navLangsEl = '[data-framer="nav-langs"]';
    const navClockEl = document.querySelector('[data-framer="nav-clock"]') as Element;
    const navYusrMuttaqienEl = document.querySelector(
      '[data-framer="nav-yusr-muttaqien"]'
    ) as Element;

    if (enter) {
      SEQUENCE = [
        [navLocEl, { opacity: 0, y: 5 }, { duration: 0 }],
        [navSepEl, { opacity: 0, scale: 0.8 }, { duration: 0 }],
        [navLangsEl, { opacity: 0, y: 5 }, { duration: 0 }],
        [navClockEl, { opacity: 0, y: 5 }, { duration: 0 }],
        [navYusrMuttaqienEl, { opacity: 0, y: 5 }, { duration: 0 }],
      ];
    } else {
      SEQUENCE = [
        [navLocEl, { opacity: 1, y: 0 }, { delay: 0.8 }],
        [navSepEl, { opacity: 1, scale: 1 }, { at: 0.9 }],
        [navLangsEl, { opacity: 1, y: 0 }, { delay: stagger(0.1), at: 0.9 }],
        [navClockEl, { opacity: 1, y: 0 }],
        [navYusrMuttaqienEl, { opacity: 1, y: 0 }],
      ];
    }

    animate(SEQUENCE);
  }, [enter]);

  return null;
}
