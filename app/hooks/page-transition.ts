'use client';

import { flushSync } from 'react-dom';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import { ID_LOADER_EXIT } from '@/app/constants/loader';
import { ID_EXPANDED_MAIN } from '@/app/constants/root-layout';
import type { AnimationSequenceState } from '@/app/types/animation-sequence';

export default function usePageTransition() {
  const { setState } = useAnimationSequenceCtx();

  async function _startTransitioning(cb: {
    before?: VoidFunction;
    after: VoidFunction;
    sequences?: (draft: AnimationSequenceState['state']) => void;
  }) {
    const loaderExitEl = document.getElementById(ID_LOADER_EXIT);
    const mainEl = document.getElementById(ID_EXPANDED_MAIN);

    function animationEnd() {
      loaderExitEl?.removeEventListener('animationend', animationEnd);
      flushSync(() => {
        cb.after();
      });
    }

    await cb.before?.();
    flushSync(() => {
      setState((draft) => {
        draft.announcer.announcing = true;
        draft.isLoader.exit = true;
        draft.yusrMuttaqien.config.forceDisableLayout = true;
        cb.sequences?.(draft);
      });
    });

    loaderExitEl?.addEventListener('animationend', animationEnd);
    mainEl?.classList.add('origin-bottom', 'animate-main-push-up-hide');
    loaderExitEl?.classList.add(
      'animate-loader-exit-push-up-show',
      'after:animate-loader-exit-backdrop-show'
    );
  }
  async function _completeTransitioning() {
    const loaderExitEl = document.getElementById(ID_LOADER_EXIT);
    const mainEl = document.getElementById(ID_EXPANDED_MAIN);

    function finalCleanup() {
      mainEl?.classList.remove('animate-main-push-in-show');
      loaderExitEl?.classList.remove(
        'animate-loader-exit-push-up-hide',
        'after:translate-y-full',
        'after:animate-loader-exit-backdrop-hide'
      );
    }
    function reveal() {
      finalCleanup();

      flushSync(() => {
        setState((draft) => {
          draft.isLoader.exit = false;
        });
      });
    }

    if (
      mainEl?.classList.contains('animate-main-push-in-show') ||
      loaderExitEl?.classList.contains('animate-loader-exit-push-up-hide') ||
      loaderExitEl?.classList.contains('after:translate-y-full') ||
      loaderExitEl?.classList.contains('after:animate-loader-exit-backdrop-hide')
    ) {
      finalCleanup();
      mainEl?.offsetWidth;
      loaderExitEl?.offsetWidth;
    }

    mainEl?.classList.remove('origin-bottom', 'animate-main-push-up-hide');
    loaderExitEl?.classList.remove(
      'animate-loader-exit-push-up-show',
      'after:animate-loader-exit-backdrop-show'
    );
    loaderExitEl?.addEventListener('animationend', reveal);
    mainEl?.classList.add('animate-main-push-in-show');
    loaderExitEl?.classList.add(
      'animate-loader-exit-push-up-hide',
      'after:translate-y-full',
      'after:animate-loader-exit-backdrop-hide'
    );
  }

  return { start: _startTransitioning, complete: _completeTransitioning };
}

export function PageTransitionListener() {
  const { complete } = usePageTransition();
  const pathname = usePathname();

  useEffect(() => {
    complete();
  }, [pathname]);

  return null;
}
