import { useRef } from 'react';
import { useTransform, useScroll } from 'framer-motion';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import { useMediaQueryCtx } from '@/providers/media-query';
import gFD from '@/utils/get-framer-data';
import moveTo from '@/utils/move-to';
import type { HeroInteractiveProps } from '@/types/home';

export default function useHomeHeroInteractive(props: HeroInteractiveProps) {
  const { status } = props;
  const { isHover } = useMediaQueryCtx();
  const scope = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: scope, offset: ['start', 'end start'] });

  const bpCentreTransX = useTransform(scrollYProgress, [0, 1], ['0px', '0px']);
  const bpCentreTransY = useTransform(scrollYProgress, [0, 1], ['0px', '-50px']);
  const bpCentreRotX = useTransform(scrollYProgress, [0, 1], ['0deg', '-113deg']);
  const bpCentreRotY = useTransform(scrollYProgress, [0, 1], ['0deg', '0deg']);
  const bpCentreScale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const bpCentreOuterTransZ = useTransform(scrollYProgress, [0, 1], ['0px', '200px']);
  const bpCrossTransX = useTransform(scrollYProgress, [0, 1], ['0px', '0px']);
  const bpCrossTransY = useTransform(scrollYProgress, [0, 1], ['0px', '-150px']);
  const bpCrossBlur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(15px)']);
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLElement;
    const header = root.querySelector(gFD('hero-header')) as HTMLElement;
    const blueprintCross = root.querySelector(gFD('blueprint-cross')) as HTMLElement;
    const blueprintCentre = root.querySelector(gFD('blueprint-centre')) as HTMLElement;

    if (status !== 'complete') {
      const classLists = ['origin-center', 'ease-out-expo'];

      blueprintCentre.style.transformStyle = 'preserve-3d';
      blueprintCentre.style.perspective = '5000px';

      header.classList.add(
        ...classLists,
        'transition-[opacity,_transform]',
        'duration-500',
        'pointer-events-none'
      );
      blueprintCentre.classList.add(...classLists, 'transition-transform', 'duration-1000');
      blueprintCross.classList.add(
        ...classLists,
        'transition-[transform,_filter]',
        'duration-1000'
      );

      return;
    }
    if (!isHover) return;

    function _rootMouseMove(e: MouseEvent) {
      requestAnimationFrame(() => {
        const html = document.documentElement as HTMLElement;

        if (html.classList.contains('lenis-scrolling')) return;
        const root = e.target as HTMLElement;
        const { pageX, pageY } = e;
        const { offsetHeight, offsetWidth } = root;
        const rotateConstraint = 56;
        const xBoundaryCross = offsetWidth / 120;
        const yBoundaryCross = offsetHeight / 120;
        const xBoundaryCentre = offsetWidth / 100;
        const yBoundaryCentre = offsetHeight / 100;
        const xMoveCross = moveTo({ anchor: pageX, offset: offsetWidth, boundary: xBoundaryCross });
        const yMoveCross = moveTo({
          anchor: pageY,
          offset: offsetHeight,
          boundary: yBoundaryCross,
        });
        const xMoveCentre = moveTo({
          anchor: pageX,
          offset: offsetWidth,
          boundary: xBoundaryCentre,
        });
        const yMoveCentre = moveTo({
          anchor: pageY,
          offset: offsetHeight,
          boundary: yBoundaryCentre,
        });
        const yRotateCentre = ((pageX - offsetWidth / 2) / offsetWidth) * rotateConstraint;
        const xRotateCentre = (-(pageY - offsetHeight / 2) / offsetHeight) * rotateConstraint;

        bpCentreTransX.set(`${xMoveCentre}px`);
        bpCentreTransY.set(`${yMoveCentre}px`);
        bpCentreRotX.set(`${xRotateCentre}deg`);
        bpCentreRotY.set(`${yRotateCentre}deg`);
        bpCentreScale.set(0.6);
        bpCrossTransX.set(`${xMoveCross}px`);
        bpCrossTransY.set(`${yMoveCross}px`);
        bpCentreOuterTransZ.set('200px');
        bpCrossBlur.set('blur(5px)');
        headerOpacity.set(0);
      });
    }

    root.addEventListener('mousemove', _rootMouseMove);

    return () => {
      root.removeEventListener('mousemove', _rootMouseMove);
    };
  }, [isHover, status]);

  return {
    scope,
    bpUnits: {
      centre: {
        root: {
          x: bpCentreTransX,
          y: bpCentreTransY,
          rotateX: bpCentreRotX,
          rotateY: bpCentreRotY,
          scale: bpCentreScale,
        },
        outer: {
          z: bpCentreOuterTransZ,
        },
      },
      cross: {
        x: bpCrossTransX,
        y: bpCrossTransY,
        filter: bpCrossBlur,
      },
    },
    headerUnits: {
      opacity: headerOpacity,
    },
  };
}
