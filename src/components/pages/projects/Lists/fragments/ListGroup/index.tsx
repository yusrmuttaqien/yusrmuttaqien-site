import { Fragment } from 'react';
import { motion, useIsomorphicLayoutEffect, AnimatePresence } from 'framer-motion';
import { useMediaQueryStore } from '@/contexts/mediaQueries';
import useInteractive from '@/components/pages/projects/Lists/fragments/ListGroup/hooks/interactive';
import Arrow from '@/svg/Arrow';
import Cross from '@/svg/Cross';
import classMerge from '@/utils/classMerge';
import { VARIANTS } from '@/components/pages/projects/Lists/fragments/ListGroup/constant';
import type {
  ListGroupProps,
  ContentProps,
} from '@/components/pages/projects/Lists/fragments/ListGroup/type';

const TITLE_STYLES = 'trim-helvetiva-neue transition-[transform,_opacity] inline-block';

export function ListGroup(props: ListGroupProps) {
  const { count, title, children, className } = props;

  return (
    <div>
      <div
        className={classMerge(
          'flex flex-col justify-between font-nohemi text-clamp-[42_54_320_430] mt-10 py-[.1em]',
          'gap-4 overflow-hidden lg-540:flex-row xl:mt-0 xl:text-clamp-[54_84_1280_1512]'
        )}
      >
        <p className="trim-nohemi-height">{count}</p>
        <h2 className="trim-nohemi-height">{title}</h2>
      </div>
      <div
        className={classMerge(
          'grid text-lg grid-cols-[[start]_1fr_fit-content(100%)_[end]_fit-content(100%)]',
          'lg:grid-cols-[[start]_1fr_1fr_fit-content(100%)_[end]_fit-content(100%)]',
          'lg-970:grid-cols-[[start]_1fr_1fr_1fr_fit-content(100%)_[end]_fit-content(100%)]',
          'xl:grid-cols-[fit-content(100%)_[start]_2fr_1fr_1fr_fit-content(100%)_[end]_fit-content(100%)]',
          className
        )}
      >
        {count ? (
          children
        ) : (
          <p
            className={classMerge(
              'text-dynamic-[grey_60] font-bold trim-helvetiva-neue mx-auto my-6 col-span-full'
            )}
          >
            No projects
          </p>
        )}
      </div>
    </div>
  );
}
export function Title() {
  return (
    <Fragment>
      <div
        className={classMerge(
          'grid grid-cols-subgrid mt-6 col-span-full text-dynamic-[grey_60] font-bold py-2 px-1',
          'gap-3 items-center'
        )}
      >
        <p className="trim-helvetiva-neue invisible xl-only:hidden">00</p>
        <p className="trim-helvetiva-neue">Project</p>
        <p className="trim-helvetiva-neue lg-only:hidden">Industry</p>
        <p className="trim-helvetiva-neue lg-970-only:hidden">Client</p>
        <p className="trim-helvetiva-neue text-right">Year</p>
        <Arrow className="invisible w-[.8lh] h-[.8lh] rotate-[135deg] lg-970:hidden" />
      </div>
    </Fragment>
  );
}
export function Content(props: ContentProps) {
  const { className, activeContent, project } = props;
  const { titleString, title, collaborator, category, year } = project;
  const isLG970 = useMediaQueryStore((state) => state.isLG970);
  const { titleStyles, isExtended, btnCrossStyles } = useInteractive({
    activeContent,
    title: titleString,
  });

  function _toggleExtended() {
    activeContent.set(activeContent.get() === titleString ? '' : titleString);
  }

  useIsomorphicLayoutEffect(() => {
    isLG970 && activeContent.set('');
  }, [isLG970]);

  return (
    <Fragment>
      <div
        className={classMerge(
          'grid grid-cols-subgrid col-span-full py-2 px-1 counter-default',
          'overflow-hidden items-center user-select-none gap-3',
          className
        )}
      >
        <p className="trim-helvetiva-neue xl-only:hidden">
          <span className="before:contents-counter-default" />
        </p>
        <motion.p
          style={titleStyles}
          className={classMerge('font-bold truncate', TITLE_STYLES)}
          title="Project long title it doesn't fit"
        >
          {title}
        </motion.p>
        <motion.p style={titleStyles} className={classMerge('lg-only:hidden', TITLE_STYLES)}>
          {category[0]}
        </motion.p>
        <motion.p
          style={titleStyles}
          className={classMerge('lg-970-only:hidden truncate', TITLE_STYLES)}
        >
          {collaborator[0]}
        </motion.p>
        <motion.p style={titleStyles} className={classMerge('text-right', TITLE_STYLES)}>
          {year}
        </motion.p>
        <div
          className="lg-970:hidden col-[end_/_-1] relative w-[.8lh] h-[.8lh]"
          onClick={_toggleExtended}
        >
          <motion.div
            style={{ rotate: '135deg', ...titleStyles }}
            className={classMerge('h-full transition-transform')}
          >
            <Arrow />
          </motion.div>
          <motion.div
            style={btnCrossStyles}
            className={classMerge(
              'h-full transition-transform absolute inset-0 -left-1',
              '-translate-y-[200%]'
            )}
          >
            <Cross />
          </motion.div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isExtended && (
          <motion.p
            className={classMerge(
              'col-span-full bg-red-400 overflow-hidden text-center trim-helvetiva-neue',
              'text-beige'
            )}
            key="extension"
            {...VARIANTS}
          >
            THIS IS CONTENT
          </motion.p>
        )}
      </AnimatePresence>
    </Fragment>
  );
}
