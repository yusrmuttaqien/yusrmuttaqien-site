'use client';

import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';

export default function NavbarYusrMuttaqien() {
  const {
    state: { isHeroNavHandoff },
  } = useAnimationSequenceCtx();

  return isHeroNavHandoff && <YusrMuttaqien />;
}
