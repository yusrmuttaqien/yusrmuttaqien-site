import classMerge from '@/utils/classMerge';
import type { PillProps } from '@/components/pages/projects/Lists/fragments/Pill/type';

export default function Pill(props: PillProps) {
  const { children } = props;

  return (
    <p
      className={classMerge(
        'py-[.3em] px-[.6em] bg-dynamic-[grey_20] text-dynamic-grey trim-helvetiva-neue',
        '!lowercase text-[.9rem] rounded-md font-medium'
      )}
    >
      {children}
    </p>
  );
}
