import { useRef } from 'react';
import { useScroll, transform } from 'framer-motion';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import { useMediaQueryCtx } from '@/providers/media-query';
import gFD from '@/utils/get-framer-data';

const classLists = ['origin-center', 'ease-out-expo'];

export default function useHomeHeroInteraction(completeEntry: boolean) {
  const scope = useRef<HTMLElement>(null);
  const { isHover } = useMediaQueryCtx();
  const { scrollYProgress } = useScroll({ target: scope, offset: ['start', 'end start'] });

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLElement;
    const rootHeader = root.querySelector(gFD('home-hero-header')) as HTMLElement;
    const blueprintCross = root.querySelector(gFD('blueprint-cross')) as HTMLElement;
    const blueprintCentre = root.querySelector(gFD('blueprint-centre')) as HTMLElement;

    if (!completeEntry) {
      blueprintCentre.style.transformStyle = 'preserve-3d';
      rootHeader.classList.add(...classLists, 'transition-[opacity,_transform]', 'duration-500');
      blueprintCross.classList.add(
        ...classLists,
        'transition-[transform,_filter]',
        'duration-1000'
      );
      blueprintCentre.classList.add(...classLists, 'transition-transform', 'duration-1000');
      return;
    }

    if (!isHover) {
      RootYProgressHoverable(scope.current as HTMLElement);
      const clearYProgress = scrollYProgress.on('change', RootYProgressTouch.bind(null, root));

      return () => clearYProgress();
    }
    RootYProgressHoverable(scope.current as HTMLElement);
    const clearYProgress = scrollYProgress.on('change', RootYProgressHoverable.bind(null, root));
    const stopPropagation = (e: MouseEvent) => e.stopPropagation();

    root.addEventListener('mousemove', RootTrackMouse);
    rootHeader.addEventListener('mouseenter', RootHeaderMouseEnter);
    rootHeader.addEventListener('mousemove', stopPropagation);

    return () => {
      root.removeEventListener('mousemove', RootTrackMouse);
      rootHeader.removeEventListener('mouseenter', RootHeaderMouseEnter);
      clearYProgress();
    };
  }, [completeEntry, isHover]);

  return scope;
}

function RootTrackMouse(e: MouseEvent) {
  requestAnimationFrame(() => {
    const html = document.documentElement as HTMLElement;

    if (html.classList.contains('lenis-scrolling')) return;
    // #region elements
    const root = e.target as HTMLElement;
    const blueprintCross = root.querySelector(gFD('blueprint-cross')) as HTMLElement;
    const blueprintCentre = root.querySelector(gFD('blueprint-centre')) as HTMLElement;
    const blueprintCentreOuter = root.querySelector(gFD('blueprint-centre-outer')) as HTMLElement;
    // #endregion elements
    // #region valueFetch
    const { pageX, pageY } = e;
    const { offsetHeight, offsetWidth } = root;
    // #endregion valueFetch
    // #region valuePreparation
    const rotateConstraint = 56;
    const xBoundaryCross = offsetWidth / 120;
    const yBoundaryCross = offsetHeight / 120;
    const xBoundaryCentre = offsetWidth / 100;
    const yBoundaryCentre = offsetHeight / 100;
    // #endregion valuePreparation
    // #region valueCalculation
    const xMoveCross = MoveTo({ page: pageX, offset: offsetWidth, boundary: xBoundaryCross });
    const yMoveCross = MoveTo({ page: pageY, offset: offsetHeight, boundary: yBoundaryCross });
    const xMoveCentre = MoveTo({ page: pageX, offset: offsetWidth, boundary: xBoundaryCentre });
    const yMoveCentre = MoveTo({ page: pageY, offset: offsetHeight, boundary: yBoundaryCentre });
    const yRotateCentre = ((pageX - offsetWidth / 2) / offsetWidth) * rotateConstraint;
    const xRotateCentre = (-(pageY - offsetHeight / 2) / offsetHeight) * rotateConstraint;
    // #endregion valueCalculation
    // #region commit
    blueprintCentre.style.transform = `translate(${xMoveCentre}px, ${yMoveCentre}px) rotateX(${xRotateCentre}deg) rotateY(${yRotateCentre}deg) perspective(5000px) scale(0.6)`;
    blueprintCross.style.transform = `translate(${xMoveCross}px, ${yMoveCross}px)`;
    blueprintCentreOuter.style.transform = `translateZ(100px)`;
    blueprintCross.style.filter = `blur(10px)`;
    // #endregion commit
  });
}
function RootHeaderMouseEnter(e: MouseEvent) {
  const html = document.documentElement as HTMLElement;

  if (html.classList.contains('lenis-scrolling')) return;

  const rootHeader = e.target as HTMLElement;

  rootHeader.classList.add('pointer-events-none');
  rootHeader.style.opacity = '0';
  rootHeader.style.transform = 'scale(1.01)';
}
function RootYProgressHoverable(root: HTMLElement) {
  const rootHeader = root.querySelector(gFD('home-hero-header')) as HTMLElement;
  const blueprintCross = root.querySelector(gFD('blueprint-cross')) as HTMLElement;
  const blueprintCentre = root.querySelector(gFD('blueprint-centre')) as HTMLElement;
  const blueprintCentreOuter = root.querySelector(gFD('blueprint-centre-outer')) as HTMLElement;

  blueprintCentre.style.transform = `translate(0px, 0px) rotateX(0deg) rotateY(0deg) perspective(5000px) scale(1)`;
  blueprintCross.style.transform = `translate(0px, 0px)`;
  blueprintCentreOuter.style.transform = `translateZ(0px)`;
  blueprintCross.style.filter = `blur(0px)`;
  rootHeader.style.opacity = '1';
  rootHeader.style.transform = 'scale(1)';
  rootHeader.classList.remove('pointer-events-none');
}
function RootYProgressTouch(root: HTMLElement, e: number) {
  const blueprintCross = root.querySelector(gFD('blueprint-cross')) as HTMLElement;
  const blueprintCentre = root.querySelector(gFD('blueprint-centre')) as HTMLElement;
  const blueprintCentreOuter = root.querySelector(gFD('blueprint-centre-outer')) as HTMLElement;
  const blueprintCentreScale = transform(e, [0, 1], [1, 0.6]);

  blueprintCentre.style.transform = `translateY(${e * -50}px) 
  rotateX(${e * -112}deg) perspective(5000px) scale(${blueprintCentreScale})`;
  blueprintCentreOuter.style.transform = `translateZ(${e * 200}px)`;
  blueprintCross.style.transform = `translateY(${e * -150}px)`;
  blueprintCross.style.filter = `blur(${e * 15}px)`;
}

function MoveTo({ page, offset, boundary }: { page: number; offset: number; boundary: number }) {
  return Math.min(Math.max(page - offset / 2, -boundary), boundary);
}
