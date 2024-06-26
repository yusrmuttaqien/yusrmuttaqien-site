import { useIsomorphicLayoutEffect } from 'framer-motion';
import { helveticaNeue, nohemi } from '@/constants/_app';

export default function useApp() {
  useIsomorphicLayoutEffect(() => {
    const body = document.body;

    body.classList.add(helveticaNeue.variable, nohemi.variable, 'overflow-hidden');
  }, []);
}
