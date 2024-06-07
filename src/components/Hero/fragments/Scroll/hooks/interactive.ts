import { useAnimate, useIsomorphicLayoutEffect } from 'framer-motion';

export default function useInteractive() {
  const [scope, animate] = useAnimate();

  useIsomorphicLayoutEffect(() => {
    async function _startSequence() {
      await animate('#arrow-solid', { rotate: 135 }, { duration: 0 });
      await animate('#arrow-absolute', { rotate: 135, y: '-100%' }, { duration: 0 });
      animate('#arrow-solid', { y: '100%' }, { duration: 1, repeat: Infinity, ease: 'linear' });
      animate('#arrow-absolute', { y: '0%' }, { duration: 1, repeat: Infinity, ease: 'linear' });
    }

    _startSequence();
  }, []);

  return { scope };
}
