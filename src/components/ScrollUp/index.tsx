import { useLenis } from '@studio-freight/react-lenis';
import useInteractive from '@/components/ScrollUp/hooks/interactive';
import Arrow from '@/svg/Arrow';
import classMerge from '@/utils/classMerge';
import type { ScrollUpProps } from '@/components/ScrollUp/type';

export default function ScrollUp(props: ScrollUpProps) {
  const { className } = props;
  const { scope } = useInteractive();
  const lenis = useLenis();

  function _scrollUp() {
    lenis?.scrollTo('top');
  }

  return (
    <button
      ref={scope}
      className={classMerge(
        'p-3 fixed bg-dynamic-[grey_85] backdrop-blur-md overflow-hidden',
        'group/scroll-up',
        className
      )}
      onClick={_scrollUp}
    >
      <Arrow
        id="arrow-solid"
        className={classMerge(
          'h-[1em] aspect-square rotate-[-45deg] text-dynamic-beige transition-none',
          'delay-150',
          'group-hover/scroll-up:hoverable:!-translate-y-[200%]',
          'group-hover/scroll-up:hoverable:!transition-transform'
        )}
      />
      <Arrow
        id="arrow-absolute"
        className={classMerge(
          'h-[1em] aspect-square rotate-[-45deg] text-dynamic-beige absolute inset-0',
          'top-1/2 left-1/2 -translate-x-1/2 transition-none delay-300 translate-y-[200%]',
          'group-hover/scroll-up:hoverable:!-translate-y-1/2',
          'group-hover/scroll-up:hoverable:!transition-transform'
        )}
      />
    </button>
  );
}
