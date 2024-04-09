import { useRef, useState, type ReactNode } from 'react';
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

export default function useHomeMasteriesMarquee(children: ReactNode, baseVelocity: number = 0) {
  const scope = useRef<HTMLDivElement>(null);
  const direction = useRef(1);
  const { scrollY } = useScroll();
  const baseX = useMotionValue(0);
  const childWidth = useMotionValue(0);
  const [reps, setReps] = useState(1);
  const scrollVelocity = useVelocity(scrollY);
  const velocityFactor = useTransform(scrollVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => {
    const value = wrap(0, -childWidth.get(), v);

    return `${value}px`;
  });

  useIsomorphicLayoutEffect(() => {
    const debouncedCalculate = debounce(calculate, 100);

    function calculate() {
      let rAF: number;

      rAF = requestAnimationFrame(() => {
        const root = scope.current as HTMLElement;

        if (!root) return cancelAnimationFrame(rAF);
        const childWrapper = root.children.item(0) as HTMLElement;
        const child = childWrapper?.children.item(0) as HTMLElement;
        const cWidth = parseFloat(getComputedStyle(child).width);
        const wGap = parseFloat(getComputedStyle(childWrapper).gap);

        childWidth.set(cWidth + wGap);
        setReps(Math.ceil(root.offsetWidth / cWidth));
      });
    }

    window.addEventListener('resize', debouncedCalculate);
    calculate();

    return () => {
      window.removeEventListener('resize', debouncedCalculate);
    };
  }, [children]);

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
