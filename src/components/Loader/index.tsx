import { useTogglesStore } from '@/contexts/toggles';
import useContent from '@/components/Loader/hooks/content';
import useInteractive from '@/components/Loader/hooks/interactive';
import classMerge from '@/utils/classMerge';
import type { LoaderProps } from '@/components/Loader/type';

export default function Loader(props: LoaderProps) {
  const { className } = props;
  const { greeting } = useContent();
  const isLoader = useTogglesStore((store) => store.isLoader);

  useInteractive();

  if (!isLoader) return null;

  return (
    <div
      className={classMerge('grid place-items-center fixed inset-0 bg-dynamic-beige', className)}
    >
      <p className="trim-helvetiva-neue select-none mb-16">{greeting}</p>
    </div>
  );
}
