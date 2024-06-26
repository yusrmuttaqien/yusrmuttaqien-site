import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';

export default function useInteractive() {
  // TODO: Listen to toggles store
  const set = useTogglesStore((store) => store.set);

  useIsomorphicLayoutEffect(() => {
    let timeout: NodeJS.Timeout;

    timeout = setTimeout(() => {
      set('isLoader', false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);
}
