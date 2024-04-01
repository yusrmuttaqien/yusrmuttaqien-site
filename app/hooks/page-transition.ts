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
      cb.after();
    }

    await cb.before?.();
    setState((draft) => {
      draft.announcer.announcing = true;
      draft.isLoader.exit = true;
      draft.yusrMuttaqien.config.forceDisableLayout = true;
      cb.sequences?.(draft);
    });

    loaderExitEl?.addEventListener('animationend', animationEnd);
    mainEl?.classList.add('origin-bottom');
    mainEl?.classList.add('animate-main-push-up-hide');
    loaderExitEl?.classList.add('animate-loader-exit-push-up-show');
    loaderExitEl?.classList.add('after:animate-loader-exit-backdrop-show');
  }
  async function _completeTransitioning(cb?: {
    before?: VoidFunction;
    after?: VoidFunction;
    sequences?: (draft: AnimationSequenceState['state']) => void;
  }) {
    const loaderExitEl = document.getElementById(ID_LOADER_EXIT);
    const mainEl = document.getElementById(ID_EXPANDED_MAIN);

    await cb?.before?.();
    mainEl?.classList.remove('origin-bottom');
    mainEl?.classList.remove('animate-main-push-up-hide');
    loaderExitEl?.classList.remove('animate-loader-exit-push-up-show');
    loaderExitEl?.classList.remove('after:animate-loader-exit-backdrop-show');

    setState((draft) => {
      draft.announcer.announcing = false;
      draft.isLoader.exit = false;
      draft.yusrMuttaqien.config.forceDisableLayout = false;
      cb?.sequences?.(draft);
    });
    cb?.after?.();
  }

  return { start: _startTransitioning, complete: _completeTransitioning };
}
