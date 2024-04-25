import { useRef } from 'react';
import { inView, animate } from 'framer-motion';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import gFD from '@/utils/get-framer-data';

export default function useHomeHowMobileInteractive() {
  const scope = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLElement;
    const cocSteps = root.querySelectorAll(gFD('how-mobile-step'));
    const stops: VoidFunction[] = [];

    function _highlight(e: IntersectionObserverEntry) {
      animate(e.target, { opacity: 1 });

      return () => {
        animate(e.target, { opacity: 0.5 });
      };
    }

    cocSteps.forEach((step) => {
      animate(step, { opacity: 0.5 });
      stops.push(inView(step, _highlight, { margin: '-30% 0% -50% 0%' }));
    });

    return () => {
      stops.forEach((stop) => stop());
    };
  }, []);

  return { scope };
}
