import classMerge from '@/utils/classMerge';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';
import type { LoaderProps } from '@/components/Loader/type';

export default function Loader(props: LoaderProps) {
  const { className } = props;
  const { isLoader, set } = useTogglesStore((store) => ({
    isLoader: store.isLoader,
    set: store.set,
  }));

  useIsomorphicLayoutEffect(() => {
    let timeout: NodeJS.Timeout;

    timeout = setTimeout(() => {
      set('isLoader', false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (!isLoader) return null;

  return (
    <div
      className={classMerge(
        'grid place-items-center fixed inset-0 bg-dynamic-[beige_100]',
        className
      )}
    >
      <p className="trim-helvetiva-neue select-none mb-16">A moment please</p>
    </div>
  );
}
