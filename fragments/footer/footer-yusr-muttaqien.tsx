import { inView } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import YusrMuttaqien from '@/components/yusr-muttaqien';
import gFD from '@/utils/get-framer-data';
import type { FooterYusrMuttaqienProps } from '@/types/footer';

export default function FooterYusrMuttaqien(props: FooterYusrMuttaqienProps) {
  const { className } = props;
  const {
    state: { yusrMuttaqien },
    setState,
  } = useAnimationSequenceCtx();

  useIsomorphicLayoutEffect(() => {
    let clearInView: VoidFunction | undefined;

    function _intersecting() {
      setState((draft) => {
        draft.yusrMuttaqien.footer = true;
      });

      return () => {
        setState((draft) => {
          draft.yusrMuttaqien.footer = false;
        });
      };
    }

    clearInView = inView(gFD('footer-contact'), _intersecting);

    return clearInView;
  }, [yusrMuttaqien.footer]);

  return <YusrMuttaqien isVisible={yusrMuttaqien.footer} withPlaceholder className={className} />;
}
