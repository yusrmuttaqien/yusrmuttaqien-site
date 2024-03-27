'use client';

import { useEffect } from 'react';
import { animate, stagger } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import { ID_LOADER_PERCENT, ID_LOADER } from '@/app/constants/loader';

declare global {
  interface Window {
    ymLoader: number;
  }
}

export default function LoaderInteractive() {
  const {
    state: { isCompsReady },
    setState,
  } = useAnimationSequenceCtx();

  useEffect(() => {
    clearInterval(window.ymLoader);
    let timeoutFadeOut: NodeJS.Timeout;

    function fadeOut() {
      const loaderPercentEl = document.getElementById(ID_LOADER_PERCENT);
      const loaderPercentContent = loaderPercentEl?.innerHTML;
      const contentSpans = loaderPercentContent
        ?.split('')
        .map((char) => `<span class="inline-block">${char}</span>`)
        .join('');

      loaderPercentEl && (loaderPercentEl.innerHTML = contentSpans || '');
      const spans = document.querySelectorAll(`#${ID_LOADER_PERCENT} span`);

      timeoutFadeOut = setTimeout(() => {
        animate(
          spans,
          { y: ['0%', '-100%'] },
          {
            delay: stagger(0.05),
            duration: 0.3,
            ease: 'easeInOut',
            onComplete: () => {
              const loaderEl = document.getElementById(ID_LOADER);

              loaderEl?.classList.add('hidden');
              setState((draft) => {
                draft.isSplashScreen = false;
              });
            },
          }
        );
      }, 250);
    }

    const timeout = setTimeout(() => {
      const loaderPercentEl = document.getElementById(ID_LOADER_PERCENT);
      const preloader = Object.values(isCompsReady);
      const progressFrom = parseInt(loaderPercentEl?.innerText || '0');
      let progressToTemp = 0;
      let progressTo = progressFrom;

      if (preloader.length > 0) {
        preloader.forEach((compstate) => compstate && progressToTemp++);
        progressToTemp = Math.round((progressToTemp / preloader.length) * 100);
        progressToTemp > progressTo && (progressTo = progressToTemp);
      } else {
        progressTo = 100;
      }

      animate(progressFrom, progressTo, {
        duration: 1,
        onUpdate: (value) => {
          loaderPercentEl && (loaderPercentEl.innerText = Math.round(value).toString());

          value === 100 && fadeOut();
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeoutFadeOut);
    };
  }, [isCompsReady, setState]);

  return null;
}
