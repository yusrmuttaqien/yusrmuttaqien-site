import useContent from '@/components/Hero/hooks/content';
import classMerge from '@/utils/classMerge';
import type { ScrollProps } from '@/components/Hero/fragments/Scroll/type';

export default function Scroll(props: ScrollProps) {
  const { className } = props;
  const { moreSoon } = useContent();

  return (
    <div className={classMerge('text-dynamic-[grey_50]', className)} id="scroll">
      <p className="trim-helvetiva-neue">{moreSoon}</p>
    </div>
  );
}
