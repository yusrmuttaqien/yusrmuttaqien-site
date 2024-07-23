import { Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQueryStore } from '@/contexts/mediaQueries';
import useInteractive from '@/components/pages/projects/Lists/fragments/ListContent/hooks/interactive';
import Image from '@/components/Image';
import Link from '@/components/Link';
import Arrow from '@/svg/Arrow';
import Cross from '@/svg/Cross';
import Pill from '@/components/pages/projects/Lists/fragments/Pill';
import classMerge from '@/utils/classMerge';
import { VARIANTS } from '@/components/pages/projects/Lists/fragments/ListContent/constant';
import type {
  ListContentProps,
  ExtensionProps,
} from '@/components/pages/projects/Lists/fragments/ListContent/type';

const TITLE_STYLES = classMerge(
  'trim-helvetiva-neue transition-[transform,_opacity] inline-block z-10 select-none',
  'duration-300'
);

export default function ListContent(props: ListContentProps) {
  const { className, activeContent, project, id } = props;
  const { titleString, title, collaborator, category, year } = project;
  const identifier = `${id}-${titleString}`;
  const { isLG970, isHoverable } = useMediaQueryStore((state) => ({
    isLG970: state.isLG970,
    isHoverable: state.isHoverable,
  }));
  const { titleStyles, isExtended, btnCrossStyles } = useInteractive({
    activeContent,
    title: identifier,
  });

  function _toggleExtended() {
    activeContent.set(activeContent.get() === identifier ? '' : identifier);
  }
  function _toggleDesktopExtended() {
    isLG970 && isHoverable && _toggleExtended();
  }

  return (
    <Fragment>
      <div
        className={classMerge(
          'grid grid-cols-subgrid col-span-full py-2 px-1 counter-default isolate',
          'overflow-hidden items-center gap-3 relative transition-colors',
          'lg-970:hoverable:hover:text-dynamic-beige',
          'lg-970:hoverable:hover:selection:text-dynamic-grey',
          'lg-970:hoverable:hover:selection:bg-dynamic-[beige_80]',
          isLG970 && 'group/highlight cursor-pointer',
          className
        )}
        onClick={_toggleDesktopExtended}
      >
        <p className="trim-helvetiva-neue z-10 xl-only:hidden">
          <span className="before:contents-counter-default" />
        </p>
        <motion.p
          style={titleStyles}
          className={classMerge('font-bold truncate', TITLE_STYLES, 'select-text')}
          title="Project long title it doesn't fit"
        >
          {title}
        </motion.p>
        <motion.p style={titleStyles} className={classMerge('lg-only:hidden', TITLE_STYLES)}>
          {category[0][0]}
        </motion.p>
        <motion.p
          style={titleStyles}
          className={classMerge('lg-970-only:hidden truncate', TITLE_STYLES, 'select-text')}
        >
          {collaborator[0]}
        </motion.p>
        <motion.p style={titleStyles} className={classMerge('text-right', TITLE_STYLES)}>
          {year}
        </motion.p>
        <button
          className="col-[end_/_-1] relative w-[.9rem] h-[.9rem] z-10 lg-970:hidden"
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
              '-translate-y-[200%] duration-300'
            )}
          >
            <Cross />
          </motion.div>
        </button>
        <span
          className={classMerge(
            'absolute inset-0 bg-dynamic-grey z-0 opacity-0 transition-opacity',
            'lg-970:group-hover/highlight:hoverable:opacity-100'
          )}
        />
      </div>
      <AnimatePresence initial={false}>
        {isExtended && !isLG970 && (
          <MobileExtension key="extension-mobile" project={project} {...VARIANTS} />
        )}
        {isExtended && isLG970 && (
          <DesktopExtension key="extension-dekstop" project={project} {...VARIANTS} />
        )}
      </AnimatePresence>
    </Fragment>
  );
}

function MobileExtension(props: ExtensionProps) {
  const { project, ...rest } = props;
  const { title, collaborator, category, year, src, alt, hrefs } = project;

  return (
    <motion.section className={classMerge('col-span-full overflow-hidden')} {...rest}>
      <div className="pb-6 px-1 space-y-2">
        <div>
          <p className={classMerge('font-bold trim-helvetiva-neue')}>{title}</p>
          <p className={classMerge('trim-helvetiva-neue space-x-1 text-[.8em]')}>
            {collaborator.map((col, idx, arr) => {
              const isLast = idx === arr.length - 1;

              return (
                <Fragment key={col}>
                  <span>{col}</span>
                  {!isLast && <span className="text-[.8em]">x</span>}
                </Fragment>
              );
            })}
          </p>
        </div>
        <p className={classMerge('trim-helvetiva-neue')}>{year}</p>
        <Image src={src} alt={alt} className={{ container: 'w-full aspect-square' }} scale={1} />
        <div className="flex flex-wrap gap-1">
          {category.map((cat) => {
            const Wrapper = cat[1] !== '#' ? Link : Fragment;

            return (
              <Wrapper key={cat[0]} href={cat[1]} look="custom">
                <Pill key={cat[0]} className={classMerge(cat[1] !== '#' && 'underline')}>
                  {cat[0]}
                </Pill>
              </Wrapper>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 !mt-6 items-end">
          {hrefs.map((href) => (
            <Link
              className={{ a: 'w-max' }}
              key={href[1]}
              href={href[1]}
              isDisabled={href[1] === '#'}
            >
              {href[0]}
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function DesktopExtension(props: ExtensionProps) {
  const { project, ...rest } = props;
  const { collaborator, category, hrefs } = project;

  return (
    <motion.section
      className={classMerge('col-span-full overflow-hidden xl:col-[start_/_-1]')}
      {...rest}
    >
      <div className="pb-6 pt-3 px-1 space-y-2">
        {collaborator.length > 1 && (
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
        )}
        <div className="flex flex-wrap gap-1">
          {category.map((cat) => {
            const Wrapper = cat[1] !== '#' ? Link : Fragment;

            return (
              <Wrapper key={cat[0]} href={cat[1]} look="custom">
                <Pill key={cat[0]} className={classMerge(cat[1] !== '#' && 'underline')}>
                  {cat[0]}
                </Pill>
              </Wrapper>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 !mt-6 items-end">
          {hrefs.map((href) => (
            <Link
              className={{ a: 'w-max' }}
              key={href[1]}
              href={href[1]}
              isDisabled={href[1] === '#'}
            >
              {href[0]}
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
