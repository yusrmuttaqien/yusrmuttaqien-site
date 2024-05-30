import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';

export default function useInteractive() {
  const set = useTogglesStore((store) => store.set);

  useIsomorphicLayoutEffect(() => {
    let timeout: NodeJS.Timeout;

    timeout = setTimeout(() => {
      set('isLoader', false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
}
