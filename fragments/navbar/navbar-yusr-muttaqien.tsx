import { useAnimationSequenceCtx } from '@/providers/animation-sequence';
import YusrMuttaqien from '@/components/yusr-muttaqien';
import classMerge from '@/utils/class-merge';

export default function NavbarYusrMuttaqien() {
  const {
    state: { yusrMuttaqien },
  } = useAnimationSequenceCtx();
  const isShowTitle = !yusrMuttaqien.hero && !yusrMuttaqien.footer && yusrMuttaqien.navbar;

  return (
    <div
      data-framer="yusr-muttaqien"
      className={classMerge(
        'absolute top-full left-0 w-full container pointer-events-none',
        'lg:-mt-[1.5rem]'
      )}
    >
      <YusrMuttaqien
        className={{ pathFill: 'fill-beige' }}
        isVisible={isShowTitle}
        withPlaceholder="navbar"
      />
    </div>
  );
}
