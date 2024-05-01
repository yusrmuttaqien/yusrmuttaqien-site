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
import type { MarqueeInteractiveParam } from '@/types/marquee';

export default function useMarqueeIntractive(props: MarqueeInteractiveParam) {
  const { baseVelocity = 0, forceDirection } = props;
  const scope = useRef<HTMLDivElement>(null);
  const direction = useRef(forceDirection || 1);
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
    let factor = 0;

    if (!forceDirection) {
      if (scrollVelocity.get() > 0) {
        direction.current = 1;
      } else if (scrollVelocity.get() < 0) {
        direction.current = -1;
      }
      factor = velocityFactor.get();
    }

    moveBy += direction.current * moveBy * factor;

    baseX.set(baseX.get() + moveBy);
  });

  return { scope, x, reps };
}
