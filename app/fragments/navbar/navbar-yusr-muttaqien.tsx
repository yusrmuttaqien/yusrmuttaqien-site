'use client';

import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';
import classMerge from '@/app/utils/class-merge';

export default function NavbarYusrMuttaqien() {
  const {
    state: { bigTitlePos },
  } = useAnimationSequenceCtx();
  const isShowTitle = !bigTitlePos.hero && !bigTitlePos.footer;

  return (
    <div
      className={classMerge(
        'absolute top-full left-0 w-full container pointer-events-none',
        'lg:-mt-[1.5rem]'
      )}
    >
      {isShowTitle && <YusrMuttaqien className={{ pathFill: 'fill-beige' }} />}
    </div>
  );
}
