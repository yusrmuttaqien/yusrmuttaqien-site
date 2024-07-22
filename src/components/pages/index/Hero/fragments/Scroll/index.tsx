import useContent from '@/components/pages/index/Hero/hooks/content';
import useInteractive from '@/components/pages/index/Hero/fragments/Scroll/hooks/interactive';
import Arrow from '@/svg/Arrow';
import classMerge from '@/utils/classMerge';
import type { ScrollProps } from '@/components/pages/index/Hero/fragments/Scroll/type';

export default function Scroll(props: ScrollProps) {
  const { className } = props;
  const { scroll } = useContent();
  const { scope } = useInteractive();

  return (
    <div
      ref={scope}
      className={classMerge('text-dynamic-[grey_80] flex flex-row gap-1', className)}
      id="scroll"
    >
      <p className="trim-helvetiva-neue">{scroll}</p>
      <div className="relative overflow-hidden">
        <Arrow id="arrow-solid" className={classMerge('h-[1em] aspect-square rotate-[135deg]')} />
        <Arrow
          id="arrow-absolute"
          className={classMerge(
            'h-[1em] aspect-square -translate-y-full rotate-[135deg] absolute inset-0'
          )}
        />
      </div>
    </div>
  );
}
