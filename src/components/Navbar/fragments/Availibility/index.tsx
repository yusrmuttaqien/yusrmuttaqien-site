// TODO: Add devtools & api handler to change availibility status
import useContent from '@/components/Navbar/hooks/content';
import classMerge from '@/utils/classMerge';
import type { AvailibilityProps } from '@/components/Navbar/fragments/Availibility/type';

export default function Availibility(props: AvailibilityProps) {
  const { className } = props;
  const { available } = useContent();

  return (
    <div id="availibility" className={classMerge('bg-dynamic-green p-[0.625rem]', className)}>
      <p className="text-beige trim-helvetiva-neue text-center">{available}</p>
    </div>
  );
}
