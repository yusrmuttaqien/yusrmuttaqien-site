import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import useFooterYusrMuttaqien from '@/hooks/footer/footer-yusr-muttaqien';
import YusrMuttaqien from '@/components/yusr-muttaqien';
import type { FooterYusrMuttaqienProps } from '@/types/footer';

export default function FooterYusrMuttaqien(props: FooterYusrMuttaqienProps) {
  const { className, isInView } = props;
  const {
    state: { yusrMuttaqien },
  } = useAnimationSequenceCtx();

  useFooterYusrMuttaqien({ isInView });

  return <YusrMuttaqien isVisible={yusrMuttaqien.footer} withPlaceholder className={className} />;
}
