'use client';

import { tv } from 'tailwind-variants';
import { type MouseEvent, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useMediaQueryCtx } from '@/app/providers/media-query';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import Link from '@/app/components/link';
import MainProjectsCardTags from '@/app/fragments/main-projects/card/main-projects-card-tags';
import classMerge from '@/app/utils/class-merge';
import { ID_PROJECT_CARD_TAGS, ID_PROJECT_CARD_TOGGLE } from '@/app/constants/main';
import type {
  CardContentWrapperProps,
  CardCoverProps,
  MainProjectsCardProps,
} from '@/app/types/main';

const paddingStyle = 'p-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)]';
export const contentStyles = tv({
  slots: {
    wrapper: 'absolute inset-0',
    content: classMerge(
      paddingStyle,
      'px-[calc(clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)_-_0.125rem)]',
      'md:px-[calc(clamp(1rem,_-0.0644rem_+_3.9604vw,_2rem)_-_0.125rem)]',
      'mx-[0.125rem] overflow-auto overscroll-contain w-full h-full'
    ),
  },
});

export default function MainProjectsCard({
  idx,
  title,
  children,
  tags,
  className,
}: MainProjectsCardProps) {
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
        className={className}
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
}: CardContentWrapperProps & { className?: Partial<typeof contentStyles.slots> }) {
  const { wrapper, content } = contentStyles();

  return (
    <div className={wrapper({ className: className?.wrapper })}>
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
      <div data-lenis-prevent className={content({ className: className?.content })}>
        {children}
      </div>
    </div>
  );
}

function CardCover({ className, style, toggleCover, content }: CardCoverProps) {
  const state = useMotionValue(0);
  const arrowRef = useRef(null);
  const buttonRef = useRef(null);
  const { isHover } = useMediaQueryCtx();
  const { setState } = useAnimationSequenceCtx();
  const yMouse = useMotionValue(0);
  const xMouse = useMotionValue(0);
  const scale = useMotionValue(0);
  const rotation = useMotionValue('0deg');
  const yPosNum = useTransform(state, [0, 100], ['0%', '100%']);
  const yPosButton = useTransform(state, [0, 100], ['-100%', '0%']);
  const opacityNum = useTransform(state, [0, 100], [100, 0]);

  function _toggleNavbarAnimatePresence() {
    setState((draft) => {
      draft.navbarAnimatePresence = true;
    });
  }
  function _rotateArrow() {
    const arrowRect = (arrowRef.current as unknown as Element)?.getBoundingClientRect();
    const targetRect = (buttonRef.current as unknown as Element)?.getBoundingClientRect();

    const targetX = (targetRect?.left || 0) - (targetRect?.width || 0) / 2;
    const targetY = (targetRect?.top || 0) - (targetRect?.height || 0) / 3;

    const radians = Math.atan2(targetY - arrowRect.y, targetX - arrowRect.x);
    const degrees = radians * (180 / Math.PI);

    rotation.set(`${degrees}deg`);
  }
  function _trackToggle(e: MouseEvent<HTMLDivElement>) {
    if (!isHover) return;

    if (
      document.getElementById(ID_PROJECT_CARD_TOGGLE)?.contains(e.target as Node) ||
      document.getElementById(ID_PROJECT_CARD_TAGS)?.contains(e.target as Node) ||
      (e.target as Element).tagName === 'A'
    ) {
      return scale.set(0);
    }

    const rect = (e.currentTarget as Element).getBoundingClientRect();

    // NOTE: 32 is half of the width of the tracker element
    xMouse.set(e.clientX - rect.left - 32);
    yMouse.set(e.clientY - rect.top - 32);
    scale.set(1);
    _rotateArrow();
  }

  const _toggleMagnifier = useCallback(
    (v: number) => {
      return () => {
        if (!isHover) return;

        state.set(v);
      };
    },
    [isHover, state]
  );
  const _unTrackToggle = useCallback(() => {
    scale.set(0);
  }, [scale]);

  useEffect(() => {
    if (!isHover) {
      _unTrackToggle();
      _toggleMagnifier(0)();
    }
  }, [isHover, _unTrackToggle, _toggleMagnifier]);

  return (
    <motion.div
      className={classMerge(
        'space-y-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)] isolate overflow-hidden',
        'md:px-[clamp(1rem,_-0.0644rem_+_3.9604vw,_2rem)] relative cursor-none',
        paddingStyle,
        className
      )}
      style={style}
      onMouseEnter={_trackToggle}
      onMouseMove={_trackToggle}
      onMouseLeave={_unTrackToggle}
    >
      <header className="space-y-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)]">
        <div className="flex gap-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)]">
          <div
            className="relative overflow-hidden z-10"
            id={ID_PROJECT_CARD_TOGGLE}
            ref={buttonRef}
            onMouseEnter={_toggleMagnifier(100)}
            onMouseLeave={_toggleMagnifier(0)}
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
              'relative before:absolute before:-inset-[99rem] flex-1 hoverable:backdrop-blur-8 pointer-events-none',
              'before:border-[99rem] before:dark:border-grey before:border-beige xl:w-28 before:-z-[10]'
            )}
          />
        </div>
        <Link
          announcing="manually"
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
      <motion.div
        className={classMerge(
          'bg-beige/60 dark:bg-grey/60 border border-grey/60 dark:border-beige/60',
          'h-16 aspect-[1] !m-0 top-0 left-0 z-10 pointer-events-none absolute grid place-items-center',
          'transition-transform ease-linear duration-75 backdrop-blur-8 will-change-transform'
        )}
        style={{ x: xMouse, y: yMouse, scale }}
        ref={arrowRef}
      >
        <motion.p className="body-normal font-semibold" style={{ rotate: rotation, scale: 1.5 }}>
          &gt;
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
