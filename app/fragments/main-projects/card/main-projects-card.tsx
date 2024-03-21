'use client';

import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useMediaQueryCtx } from '@/app/providers/media-query';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import MainProjectsCardTags from '@/app/fragments/main-projects/card/main-projects-card-tags';
import classMerge from '@/app/utils/class-merge';
import type {
  CardContentWrapperProps,
  CardCoverProps,
  MainProjectsCardProps,
} from '@/app/types/main-projects-card';

const paddingStyle = 'p-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)]';

export default function MainProjectsCard({ idx, title, children, tags }: MainProjectsCardProps) {
  const state = useMotionValue(0);
  const yPosCover = useTransform(state, [0, 100], ['0%', '101%']);
  const stringIdx = idx.toString().padStart(2, '0');

  function _onToggleCover() {
    if (state.get() === 0) {
      state.set(100);
    } else {
      state.set(0);
    }
  }

  return (
    <figure className="relative overflow-hidden border-y-2 border-grey/60 dark:border-beige/60">
      <CardCover
        className="relative z-10 transition-transform"
        style={{ y: yPosCover }}
        toggleCover={_onToggleCover}
        content={{ countText: stringIdx, title, tags }}
      />
      <CardContentWrapper
        className="absolute inset-0"
        toggleCover={_onToggleCover}
        textSizePlaceholder={stringIdx}
      >
        {children}
      </CardContentWrapper>
    </figure>
  );
}

function CardContentWrapper({
  className,
  toggleCover,
  textSizePlaceholder,
  children,
}: CardContentWrapperProps) {
  return (
    <div
      className={classMerge(
        paddingStyle,
        'px-[calc(clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)_-_0.125rem)]',
        'md:px-[calc(clamp(1rem,_-0.0644rem_+_3.9604vw,_2rem)_-_0.125rem)]',
        'mx-[0.125rem]',
        className
      )}
    >
      <div
        className={classMerge(
          'absolute overflow-hidden w-fit',
          'top-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)]',
          'left-[calc(clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)_-_0.125rem)]',
          'md:left-[calc(clamp(1rem,_-0.0644rem_+_3.9604vw,_2rem)_-_0.125rem)]'
        )}
      >
        <button
          className={classMerge(
            'absolute inset-0 transition-[transform,_opacity,background-color] cursor-zoom-out',
            'hover:bg-beige/60 dark:hover:bg-grey/60'
          )}
          onClick={toggleCover}
        >
          <span className="translate-center font-roboto-mono text-3xl">-</span>
        </button>
        <p
          className={classMerge(
            'font-roboto-mono invisible',
            'text-[clamp(1.4881rem,_-0.001rem_+_7.4455vw,_2rem)]'
          )}
        >
          {textSizePlaceholder}
        </p>
      </div>
      {children}
    </div>
  );
}

function CardCover({ className, style, toggleCover, content }: CardCoverProps) {
  const state = useMotionValue(0);
  const { isHover } = useMediaQueryCtx();
  const { setState } = useAnimationSequenceCtx();
  const yPosNum = useTransform(state, [0, 100], ['0%', '100%']);
  const yPosButton = useTransform(state, [0, 100], ['-100%', '0%']);
  const opacityNum = useTransform(state, [0, 100], [100, 0]);

  function _toggleMagnifier() {
    if (!isHover) return;

    if (state.get() === 0) {
      state.set(100);
    } else {
      state.set(0);
    }
  }
  function _toggleNavbarAnimatePresence() {
    setState((draft) => {
      draft.navbarAnimatePresence = true;
    });
  }

  return (
    <motion.div
      className={classMerge(
        'space-y-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)] isolate overflow-hidden',
        'md:px-[clamp(1rem,_-0.0644rem_+_3.9604vw,_2rem)]',
        paddingStyle,
        className
      )}
      style={style}
    >
      <header className="space-y-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)]">
        <div className="flex gap-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)]">
          <div
            className="relative overflow-hidden z-10"
            onMouseEnter={_toggleMagnifier}
            onMouseLeave={_toggleMagnifier}
          >
            <motion.button
              className="absolute inset-0 transition-[transform,_opacity] cursor-zoom-in"
              style={{ y: yPosButton, opacity: state }}
              onClick={toggleCover}
            >
              <span className="translate-center font-roboto-mono text-3xl">+</span>
            </motion.button>
            <motion.p
              className={classMerge(
                'font-roboto-mono select-none transition-[transform,_opacity]',
                'text-[clamp(1.4881rem,_-0.001rem_+_7.4455vw,_2rem)]'
              )}
              style={{ y: yPosNum, opacity: opacityNum }}
            >
              {content.countText}
            </motion.p>
          </div>
          <div
            className={classMerge(
              'relative before:absolute before:-inset-[99rem] flex-1 hoverable:backdrop-blur-8',
              'before:border-[99rem] before:dark:border-grey before:border-beige xl:w-28 before:-z-[10]'
            )}
          />
        </div>
        <Link
          className={classMerge(
            'block h3-normal truncate z-10 relative w-fit',
            'after:table after:-mt-[.12em] before:absolute before:-bottom-1 before:left-0',
            'before:right-0 before:h-[0.125rem] before:bg-current'
          )}
          href="/project/project-one"
          title={content.title}
          onClick={_toggleNavbarAnimatePresence}
        >
          {content.title}
        </Link>
      </header>
      <MainProjectsCardTags tags={content.tags} />
    </motion.div>
  );
}
