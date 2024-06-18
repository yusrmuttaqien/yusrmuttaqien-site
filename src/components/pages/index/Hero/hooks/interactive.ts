import { useRef } from 'react';
import {
  useMotionValue,
  useSpring,
  useIsomorphicLayoutEffect,
  useScroll,
  transform,
} from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';
import debounce from '@/utils/debounce';

export default function useInteractive() {
  const scope = useRef<HTMLDivElement>(null);
  const patternScope = useRef<HTMLDivElement>(null);
  const scopeClientRect = useRef<DOMRect | null>(null);
  const { scrollYProgress } = useScroll({ target: scope, offset: ['start', 'end start'] });
  const z = useMotionValue('0px');
  const y = useMotionValue('0px');
  const opacity = useMotionValue(1);
  const filterBlur = useMotionValue('blur(0px)');
  const xHighlight = useMotionValue(0);
  const yHighlight = useMotionValue(0);
  const xSpringHighlight = useSpring(xHighlight);
  const ySpringHighlight = useSpring(yHighlight);
  const isLoader = useTogglesStore((state) => state.isLoader);

  useIsomorphicLayoutEffect(() => {
    const patternWrapper = patternScope.current as HTMLDivElement;
    const debouncedGetClientRect = debounce(_getClientRect, 100);

    function _moveHighlight(e: MouseEvent) {
      const { top, left, height, width } = scopeClientRect.current as DOMRect;
      const { offsetHeight, offsetWidth, classList } = patternWrapper.querySelector(
        '#highlight'
      ) as HTMLDivElement;
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const relativeX = e.clientX - centerX - offsetWidth / 2;
      const relativeY = e.clientY - centerY - offsetHeight / 2;

      xHighlight.set(relativeX);
      yHighlight.set(relativeY);
      classList.remove('opacity-0');
    }
    function _trackMouse(e: MouseEvent) {
      patternWrapper.offsetHeight !== scopeClientRect.current?.height && _getClientRect();
      _moveHighlight(e);
      // TODO: Add interactive gradient for mesh
    }
    function _getClientRect() {
      requestAnimationFrame(() => {
        scopeClientRect.current = patternWrapper.getBoundingClientRect();
      });
    }

    _getClientRect();
    patternWrapper.addEventListener('mousemove', _trackMouse);
    window.addEventListener('resize', debouncedGetClientRect);

    return () => {
      patternWrapper.removeEventListener('mousemove', _trackMouse);
      window.removeEventListener('resize', debouncedGetClientRect);
    };
  }, []);
  useIsomorphicLayoutEffect(() => {
    if (isLoader) return;

    function _fadeHero(v: number) {
      z.set(transform(v, [0, 0.6], ['0px', '-4000px']));
      filterBlur.set(transform(v, [0, 0.5], ['blur(0px)', 'blur(16px)']));
      opacity.set(transform(v, [0, 0.4], [1, 0]));
      y.set(transform(v, [0, 0.7], ['0px', '5px']));
    }

    scrollYProgress.on('change', _fadeHero);

    return () => {
      scrollYProgress.clearListeners();
    };
  }, [isLoader]);

  return {
    y,
    z,
    scope,
    opacity,
    filterBlur,
    patternScope,
    xHighlight: xSpringHighlight,
    yHighlight: ySpringHighlight,
  };
}
