'use client';

import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';
import classMerge from '@/app/utils/class-merge';
import { ID_NAVBAR_YUSR_MUTTAQIEN } from '@/app/constants/navbar';

export default function NavbarYusrMuttaqien() {
  const {
    state: { yusrMuttaqien },
  } = useAnimationSequenceCtx();
  const isShowTitle = !yusrMuttaqien.hero && !yusrMuttaqien.footer && yusrMuttaqien.navbar;

  return (
    <div
      id={ID_NAVBAR_YUSR_MUTTAQIEN}
      data-framer="nav-yusr-muttaqien"
      className={classMerge(
        'absolute top-full left-0 w-full container pointer-events-none',
        'lg:-mt-[1.5rem]'
      )}
    >
      <YusrMuttaqien className={{ pathFill: 'fill-beige' }} isVisible={isShowTitle} />
    </div>
  );
}
