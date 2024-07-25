import { useRef } from 'react';
import {
  useMotionValue,
  useSpring,
  useIsomorphicLayoutEffect,
  useScroll,
  transform,
  motionValue,
  type MotionStyle,
} from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';
import debounce from '@/utils/debounce';

export default function useInteractive() {
  const { scrollY } = useScroll();
  const scope = useRef<HTMLDivElement>(null);
  const patternScope = useRef<HTMLDivElement>(null);
  const scopeClientRect = useRef<DOMRect | null>(null);
  const { isLoader, isIndexHeroEntry } = useTogglesStore((state) => ({
    isLoader: state.isLoader,
    isIndexHeroEntry: state.isIndexHeroEntry,
  }));
  // #region Heroes
  const zPattern = useMotionValue('0px');
  const zImg = useMotionValue('0px');
  const zTitle = useMotionValue('0px');
  const rolesMotionValue = useMotionValue(0);
  const linksMotionValue = useMotionValue(0);
  const opacity = useMotionValue(1);
  const opacityPattern = useMotionValue(1);
  const opacityTitle = useMotionValue(1);
  const blur = useMotionValue('blur(0px)');
  const blurTitle = useMotionValue('blur(0px)');
  // #endregion Heroes
  // #region Highlight
  const xHighlight = useMotionValue(0);
  const yHighlight = useMotionValue(0);
  const xSpringHighlight = useSpring(xHighlight, { duration: 0.5 });
  const ySpringHighlight = useSpring(yHighlight, { duration: 0.5 });
  // #endregion Highlight

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
      const hFull = window.innerHeight;
      const anchor = transform(v, [0, hFull], [0, 1]);

      zPattern.set(transform(anchor, [0, 0.9], ['0px', '-4000px']));
      zTitle.set(transform(anchor, [0, 0.8, 1], ['0px', '0px', '-500px']));
      zImg.set(transform(anchor, [0, 0.9], ['0px', '-1500px']));
      rolesMotionValue.set(transform(anchor, [0, 0.9], [0, 1], { clamp: false }));
      linksMotionValue.set(transform(anchor, [0, 0.9], [0, 1]));
      opacity.set(transform(anchor, [0, 0.9], [1, 0]));
      opacityPattern.set(transform(anchor, [0, 0.9], [1, 0]));
      opacityTitle.set(transform(anchor, [0, 0.9, 1], [1, 1, 0]));
      blur.set(transform(anchor, [0, 0.9], ['blur(0px)', 'blur(16px)']));
      blurTitle.set(transform(anchor, [0, 0.9, 1], ['blur(0px)', 'blur(0px)', 'blur(16px)']));
    }

    scrollY.on('change', _fadeHero);

    return () => {
      scrollY.clearListeners();
    };
  }, [isLoader]);

  return {
    scope,
    patternScope,
    highlightStyles: {
      x: xSpringHighlight,
      y: ySpringHighlight,
    } as MotionStyle,
    patternStyles: {
      z: zPattern,
      opacity: opacityPattern,
    } as MotionStyle,
    imgStyles: {
      z: zImg,
      filter: blur,
      opacity: opacity,
    } as MotionStyle,
    titleStyles: {
      filter: blurTitle,
      opacity: opacityTitle,
      z: zTitle,
    } as MotionStyle,
    rolesValue: isIndexHeroEntry ? motionValue(0) : rolesMotionValue,
    linksValue: isIndexHeroEntry ? motionValue(0) : linksMotionValue,
  };
}
