import { Fragment, useState } from 'react';
import { motion, AnimatePresence, useIsomorphicLayoutEffect } from 'framer-motion';
import { useMediaQueryStore } from '@/contexts/mediaQueries';
import Arrow from '@/svg/Arrow';
import classMerge from '@/utils/classMerge';
import { VARIANT } from '@/components/pages/projects/Lists/fragments/ListGroup/constant';
import type {
  ListGroupProps,
  ContentProps,
} from '@/components/pages/projects/Lists/fragments/ListGroup/type';

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
          'grid text-lg grid-cols-[[start]_2fr_fit-content(100%)_[end]_fit-content(100%)]',
          'lg:grid-cols-[[start]_2fr_1fr_fit-content(100%)_[end]_fit-content(100%)]',
          'lg-970:grid-cols-[[start]_2fr_1fr_1fr_fit-content(100%)_[end]_fit-content(100%)]',
          'xl:grid-cols-[fit-content(100%)_[start]_2fr_1fr_1fr_fit-content(100%)_[end]_fit-content(100%)]',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function Title() {
  return (
    <Fragment>
      <div
        className={classMerge(
          'grid grid-cols-subgrid mt-6 col-full text-dynamic-[grey_60] font-bold py-2 px-1',
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
  const { className, activeContent } = props;
  const [isExtended, setIsExtended] = useState(false);
  const isLG970 = useMediaQueryStore((state) => state.isLG970);

  function _toggleExtended() {
    setIsExtended((prev) => !prev);
  }

  useIsomorphicLayoutEffect(() => {
    isLG970 && setIsExtended(false);

    activeContent.on('change', (v: string) => {});

    return () => {
      activeContent.clearListeners();
    };
  }, [isLG970]);

  return (
    <Fragment>
      <div
        className={classMerge(
          'grid grid-cols-subgrid col-full py-2 px-1 gap-3 counter-default',
          'overflow-hidden items-center user-select-none',
          className
        )}
      >
        <p className="trim-helvetiva-neue xl-only:hidden">
          <span className="before:contents-counter-default" />
        </p>
        <AnimatePresence initial={false}>
          {!isExtended && (
            <Fragment>
              <motion.p
                className="trim-helvetiva-neue font-bold truncate w-full min-w-0"
                title="Project long title it doesn't fit"
                {...VARIANT}
              >
                Project long title it doesn't fit
              </motion.p>
              <motion.p className="trim-helvetiva-neue lg-only:hidden" {...VARIANT}>
                Industry
              </motion.p>
              <motion.p className="trim-helvetiva-neue lg-970-only:hidden truncate" {...VARIANT}>
                Client
              </motion.p>
              <motion.p className="trim-helvetiva-neue text-right" {...VARIANT}>
                2021-2024
              </motion.p>
            </Fragment>
          )}
        </AnimatePresence>
        <Arrow
          className={classMerge(
            'w-[.8lh] h-[.8lh] rotate-[135deg] lg-970:hidden col-[end_/_-1]',
            'transition-transform',
            isExtended && '-rotate-[45deg]'
          )}
          onClick={_toggleExtended}
        />
      </div>
    </Fragment>
  );
}
