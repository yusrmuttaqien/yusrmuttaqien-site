import classMerge from '@/utils/classMerge';
import type { LoaderProps } from '@/components/Loader/type';
import { useTogglesStore } from '@/contexts/toggles';

export default function Loader(props: LoaderProps) {
  const { className } = props;
  const isLoader = useTogglesStore((store) => store.isLoader);

  if (!isLoader) return null;

  return (
    <div
      className={classMerge('grid place-items-center fixed inset-0 bg-dynamic-beige', className)}
    >
      <p className="body trim-helvetiva-neue select-none">A moment please</p>
    </div>
  );
}
