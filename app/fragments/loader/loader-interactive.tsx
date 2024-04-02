'use client';

import { useEffect } from 'react';
import { animate, stagger, cubicBezier } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import { ID_LOADER_PERCENT, ID_LOADER_ENTER, ID_LOADER_EXIT } from '@/app/constants/loader';
import { ID_EXPANDED_MAIN } from '@/app/constants/root-layout';

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

    function exit() {
      const loaderExitEl = document.getElementById(ID_LOADER_EXIT);
      const loaderEnterEl = document.getElementById(ID_LOADER_ENTER);
      const mainEl = document.getElementById(ID_EXPANDED_MAIN);

      function reveal() {
        mainEl?.classList.remove('animate-main-push-in-show');
        loaderExitEl?.classList.remove('animate-loader-exit-push-up-hide');
        loaderExitEl?.classList.remove('after:translate-y-full');
        loaderExitEl?.classList.remove('after:animate-loader-exit-backdrop-hide');

        setState((draft) => {
          draft.isLoader.exit = false;
        });
      }

      loaderExitEl?.addEventListener('animationend', reveal);
      mainEl?.classList.add('animate-main-push-in-show');
      loaderExitEl?.classList.add('animate-loader-exit-push-up-hide');
      loaderExitEl?.classList.add('after:translate-y-full');
      loaderExitEl?.classList.add('after:animate-loader-exit-backdrop-hide');
      loaderEnterEl?.classList.add('hidden');
      setState((draft) => {
        draft.isLoader.enter = false;
        draft.isLoader.exit = true;
      });
    }
    function replace() {
      const loaderPercentEl = document.getElementById(ID_LOADER_PERCENT);
      const loaderPercentContent = loaderPercentEl?.innerHTML;
      const percentSpans = loaderPercentContent
        ?.split('')
        .map((char) => `<span class="inline-block">${char}</span>`)
        .join('');

      loaderPercentEl && (loaderPercentEl.innerHTML = percentSpans || '');
      const spans = document.querySelectorAll(`#${ID_LOADER_PERCENT} span`);

      timeoutFadeOut = setTimeout(() => {
        animate(
          spans,
          { y: ['0%', '-100%'] },
          {
            delay: stagger(0.04),
            duration: 0.6,
            ease: cubicBezier(0.83, 0, 0.17, 1),
            onComplete: exit,
          }
        );
      }, 100);
    }
    function takeover() {
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

          value === 99 && loaderPercentEl?.classList.remove('animate-pulse');
          value === 100 && replace();
        },
      });
    }

    requestAnimationFrame(takeover);

    return () => clearTimeout(timeoutFadeOut);
  }, [isCompsReady]);

  return null;
}
