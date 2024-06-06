import { useRef, useState } from 'react';
import {
  useInView,
  useScroll,
  useVelocity,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useIsomorphicLayoutEffect,
} from 'framer-motion';
import wrap from '@/utils/wrap';
import debounce from '@/utils/debounce';
import type { InteractiveParams } from '@/components/Marquee/type';

export default function useInteractive(params: InteractiveParams) {
  const { children, velocity = 100, direction = 'left', lockDirection = false } = params;
  const { scrollY } = useScroll();
  const x = useMotionValue('0px');
  const width = useMotionValue(0);
  const baseVelocity = useVelocity(scrollY);
  const [repeat, setRepeat] = useState(0);
  const scope = useRef<HTMLDivElement>(null);
  const isInView = useInView(scope);
  const currentDirection = useMotionValue(direction === 'left' ? -1 : 1);
  const velocityFactor = useTransform(baseVelocity, [0, 1000], [0, 5], { clamp: false });

  function _loop(_: number, delta: number) {
    let move = currentDirection.get() * velocity * (delta / 1000);
    let factor = 0;

    if (!lockDirection) {
      if (baseVelocity.get() > 0) {
        currentDirection.set(1);
      } else if (baseVelocity.get() < 0) {
        currentDirection.set(-1);
      }

      factor = velocityFactor.get();
    }

    move += currentDirection.get() * factor * move;
    x.set(`${wrap({ min: 0, max: -width.get(), v: parseFloat(x.get()) + move })}px`);
  }
  function _void() {}

  useIsomorphicLayoutEffect(() => {
    const debouncedGetRequiredDuplicate = debounce(_getRequiredDuplicate, 100);

    function _getRequiredDuplicate() {
      requestAnimationFrame(() => {
        const root = scope.current as HTMLDivElement;
        const child = root.querySelector('#sample') as HTMLDivElement;
        const wrapper = root.querySelector('#wrapper') as HTMLDivElement;
        const rootWidth = parseFloat(getComputedStyle(root).width);
        const childWidth = parseFloat(getComputedStyle(child).width);
        let wrapperGap = parseFloat(getComputedStyle(wrapper).gap);
        wrapperGap = isNaN(wrapperGap) ? 0 : wrapperGap;

        width.set(childWidth + wrapperGap);
        setRepeat(Math.ceil(rootWidth / (childWidth + wrapperGap)));
      });
    }

    window.addEventListener('resize', debouncedGetRequiredDuplicate);
    _getRequiredDuplicate();

    return () => {
      window.removeEventListener('resize', debouncedGetRequiredDuplicate);
    };
  }, [children]);

  useAnimationFrame(isInView && velocity ? _loop : _void);

  return { scope, repeat, x };
}
