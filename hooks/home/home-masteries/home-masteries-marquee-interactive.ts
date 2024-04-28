import { useRef, useState } from 'react';
import {
  useScroll,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'framer-motion';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import wrap from '@/utils/wrap';
import debounce from '@/utils/debounce';
import type { MasteriesMarqueeInteractive } from '@/types/home';

export default function useHomeMasteriesInteractive(props: MasteriesMarqueeInteractive) {
  const { baseVelocity = 0 } = props;
  const scope = useRef<HTMLDivElement>(null);
  const direction = useRef(1);
  const rAF = useRef<number>(0);
  const { scrollY } = useScroll();
  const baseX = useMotionValue(0);
  const childWidth = useMotionValue(0);
  const [reps, setReps] = useState(1);
  const scrollVelocity = useVelocity(scrollY);
  const velocityFactor = useTransform(scrollVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => {
    const value = wrap({ min: 0, max: -childWidth.get(), v });

    return `${value}px`;
  });

  useIsomorphicLayoutEffect(() => {
    const debouncedCalculate = debounce(_calculate, 100);

    function _calculate() {
      rAF.current = requestAnimationFrame(() => {
        const root = scope.current as HTMLElement;

        if (!root) return cancelAnimationFrame(rAF.current);
        const childWrapper = root.children.item(0) as HTMLElement;
        const child = childWrapper?.children.item(0) as HTMLElement;
        const cWidth = parseFloat(getComputedStyle(child).width);
        const wGap = parseFloat(getComputedStyle(childWrapper).gap);

        childWidth.set(cWidth + wGap);
        setReps(Math.ceil(root.offsetWidth / cWidth));
      });
    }

    window.addEventListener('resize', debouncedCalculate);
    _calculate();

    return () => {
      window.removeEventListener('resize', debouncedCalculate);
    };
  }, []);
  useAnimationFrame((_, delta) => {
    let moveBy = direction.current * baseVelocity * (delta / 1000);

    if (scrollVelocity.get() > 0) {
      direction.current = 1;
    } else if (scrollVelocity.get() < 0) {
      direction.current = -1;
    }

    moveBy += direction.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return { scope, x, reps };
}
