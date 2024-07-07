import { useRouter } from 'next/router';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { helveticaNeue, nohemi } from '@/constants/_app';

export default function useApp() {
  const { beforePopState } = useRouter();

  useIsomorphicLayoutEffect(() => {
    const body = document.body;

    body.classList.add(helveticaNeue.variable, nohemi.variable, 'overflow-hidden');
    beforePopState((state) => {
      state.options.scroll = false;
      return true;
    });
  }, []);
}
