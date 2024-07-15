import { Fragment } from 'react';
import { motion, useIsomorphicLayoutEffect, AnimatePresence } from 'framer-motion';
import { useMediaQueryStore } from '@/contexts/mediaQueries';
import useInteractive from '@/components/pages/projects/Lists/fragments/ListContent/hooks/interactive';
import Image from '@/components/Image';
import Arrow from '@/svg/Arrow';
import Cross from '@/svg/Cross';
import classMerge from '@/utils/classMerge';
import { VARIANTS } from '@/components/pages/projects/Lists/fragments/ListContent/constant';
import type {
  ListContentProps,
  ExtensionProps,
} from '@/components/pages/projects/Lists/fragments/ListContent/type';

const TITLE_STYLES = 'trim-helvetiva-neue transition-[transform,_opacity] inline-block';

export default function ListContent(props: ListContentProps) {
  const { className, activeContent, project, id } = props;
  const { titleString, title, collaborator, category, year } = project;
  const isLG970 = useMediaQueryStore((state) => state.isLG970);
  const identifier = `${id}-${titleString}`;
  const { titleStyles, isExtended, btnCrossStyles } = useInteractive({
    activeContent,
    title: identifier,
  });

  function _toggleExtended() {
    activeContent.set(activeContent.get() === identifier ? '' : identifier);
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
        {isExtended && <Extension key="extension" project={project} {...VARIANTS} />}
      </AnimatePresence>
    </Fragment>
  );
}

function Extension(props: ExtensionProps) {
  const { project, ...rest } = props;
  const { title, collaborator, category, year, src, alt } = project;

  return (
    <motion.section className={classMerge('col-span-full overflow-hidden')} {...rest}>
      <div className="pb-6 px-1 space-y-2">
        <div>
          <p className={classMerge('font-bold trim-helvetiva-neue')}>{title}</p>
          <p className={classMerge('trim-helvetiva-neue space-x-1 text-[.8em]')}>
            {collaborator.map((cat, idx, arr) => {
              const isLast = idx === arr.length - 1;
              return (
                <Fragment>
                  <span>{cat}</span>
                  {!isLast && <span className="text-[.8em]">x</span>}
                </Fragment>
              );
            })}
          </p>
        </div>
        <p className={classMerge('trim-helvetiva-neue')}>{year}</p>
        <Image src={src} alt={alt} className={{ container: 'w-full aspect-square' }} />
      </div>
    </motion.section>
  );
}
