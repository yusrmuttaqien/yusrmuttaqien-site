'use client';

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { useMeasurementCtx } from '@/app/providers/measurements';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import usePageTransition from '@/app/hooks/page-transition';
import useProjectViewerHeaderTransformer from '@/app/hooks/project-viewer-header-transformer';
import Blueprint from '@/app/components/blueprint';
import classMerge from '@/app/utils/class-merge';
import debounce from '@/app/utils/debounce';
import { ID_PROJECT_PREVIEW_CONTENTS } from '@/app/constants/project';
import { SIZING_CONTAINER_DEFAULT, SIZING_CONTAINER_LG } from '@/app/constants/tailwind-config';
import type { ProjectViewerWrapperProps } from '@/app/types/project';

export default function ProjectViewerWrapper({ className }: ProjectViewerWrapperProps) {
  const {
    state: { navbarHeight },
  } = useMeasurementCtx();
  const wrapperRef = useRef(null);
  const { complete } = usePageTransition();
  const { setState } = useAnimationSequenceCtx();
  const [xEndPos, setXEndPos] = useState('-100px');
  const { scrollYProgress: yScrollContent } = useScroll({ target: wrapperRef });
  const xPosContents = useTransform(yScrollContent, [0, 1], ['0px', xEndPos]);
  const heightWrapper = useMotionValue(`calc(100svh - ${navbarHeight}px)`);
  const { className: dynamicCN, style: dynamicStyle } =
    useProjectViewerHeaderTransformer(yScrollContent);

  useLayoutEffect(() => {
    complete({
      sequences(draft) {
        draft.yusrMuttaqien.config.forceDisableLayout = true;
      },
      after() {
        setState((draft) => {
          draft.yusrMuttaqien.navbar = false;
        });
      },
    });
  }, []);

  useLayoutEffect(() => {
    function defineNeededHeight() {
      const contents = document.getElementById(ID_PROJECT_PREVIEW_CONTENTS);

      if (contents) {
        heightWrapper.set(`calc(${contents.scrollWidth}px - ${navbarHeight}px)`);
        setXEndPos(`-${contents.scrollWidth - contents.clientWidth}px`);
      }
    }

    const debouncedDefineNeededHeight = debounce(defineNeededHeight, 100);
    window.addEventListener('resize', debouncedDefineNeededHeight);
    defineNeededHeight();

    return () => window.removeEventListener('resize', debouncedDefineNeededHeight);
  }, [navbarHeight, heightWrapper]);

  return (
    <motion.article style={{ height: heightWrapper }} ref={wrapperRef}>
      <div
        style={{ '--navbar-height': `${navbarHeight}px` } as CSSProperties}
        className={classMerge(
          'pt-[calc(clamp(3rem,_0.0909rem_+_14.5455vw,_4rem)_+_var(--navbar-height))]',
          'md:pt-[calc(clamp(4rem,_1.6052rem_+_8.9109vw,_6.25rem)_+_var(--navbar-height))]',
          'container-b overflow-hidden sticky top-0 h-[100svh]',
          className
        )}
      >
        <motion.header
          style={
            {
              '--size-container': SIZING_CONTAINER_DEFAULT,
              '--size-container-lg': SIZING_CONTAINER_LG,
              ...dynamicStyle,
            } as CSSProperties
          }
          className={classMerge(
            'container absolute lg-only:top-0 left-1/2 z-20 opacity-[var(--opacity-header)]',
            'mt-[calc(var(--navbar-height)_+_var(--size-container))]',
            'lg:mt-[calc(var(--navbar-height)_+_var(--size-container-lg))]',
            'xl:bottom-[var(--size-container-lg)] -translate-x-1/2'
          )}
        >
          <div className={classMerge('origin-top-left', dynamicCN)}>
            <p className="body-subheading">It’s about damn time</p>
            <h1 className="project-title" title="Project One two three for five six">
              Project One two three for five six
            </h1>
          </div>
        </motion.header>
        <motion.div
          id={ID_PROJECT_PREVIEW_CONTENTS}
          style={
            {
              x: xPosContents,
              '--size-container': SIZING_CONTAINER_DEFAULT,
              '--size-container-lg': SIZING_CONTAINER_LG,
              '--gap': 'clamp(1.125rem, 0.0341rem + 5.4545vw, 1.5rem)',
              '--gap-xl': 'clamp(1.5rem, 1.8506rem + -0.6726vw, 1.3125rem)',
            } as CSSProperties
          }
          className={classMerge(
            'container relative flex gap-[var(--gap)]',
            'xl:gap-[var(--gap-xl)] z-10 h-full 2xl:px-[calc(var(--size-container-lg)_+_6.5625rem)]'
          )}
        >
          <Blueprint className="bg-grey/10 dark:bg-beige/10" />
          <Blueprint className="bg-grey/10 dark:bg-beige/10" />
          <Blueprint className="bg-grey/10 dark:bg-beige/10" />
          <Blueprint className="bg-grey/10 dark:bg-beige/10" />
          <Blueprint className="bg-grey/10 dark:bg-beige/10" />
          <Blueprint className="bg-grey/10 dark:bg-beige/10" />
          <div
            className={classMerge(
              'shrink-0 w-[var(--size-container)] lg:w-[var(--size-container-lg)]',
              '-ml-[var(--gap)] xl:-ml-[var(--gap-xl)]'
            )}
          />
        </motion.div>
      </div>
    </motion.article>
  );
}
