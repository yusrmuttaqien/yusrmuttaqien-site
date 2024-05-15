import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import type { FooterYusrMuttaqienParam } from '@/types/footer';

export default function useFooterYusrMuttaqien(param: FooterYusrMuttaqienParam) {
  const { isInView } = param;
  const { setState } = useAnimationSequenceCtx();

  useIsomorphicLayoutEffect(() => {
    isInView.on('change', (inView) => {
      if (inView) {
        setState((draft) => {
          draft.yusrMuttaqien.footer = true;
        });
      } else {
        setState((draft) => {
          draft.yusrMuttaqien.footer = false;
        });
      }
    });

    return () => {
      isInView.clearListeners();
    };
  }, []);
}
