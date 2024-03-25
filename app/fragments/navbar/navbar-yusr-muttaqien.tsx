'use client';

import { Fragment } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';
import classMerge from '@/app/utils/class-merge';
import { nameVariant } from '@/app/constants/navbar-yusr-muttaqien';
import { ID_NAVBAR_YUSR_MUTTAQIEN } from '@/app/constants/navbar';

export default function NavbarYusrMuttaqien() {
  const {
    state: { bigTitlePos, navbarAnimatePresence },
  } = useAnimationSequenceCtx();
  const isShowTitle = !bigTitlePos.hero && !bigTitlePos.footer && bigTitlePos.navbar;
  const Wrapper = navbarAnimatePresence ? AnimatePresence : Fragment;
  const variants = navbarAnimatePresence ? nameVariant : {};
  const wrapperProps = navbarAnimatePresence ? { initial: false } : {};

  return (
    <div
      id={ID_NAVBAR_YUSR_MUTTAQIEN}
      className={classMerge(
        'absolute top-full left-0 w-full container pointer-events-none',
        'lg:-mt-[1.5rem]'
      )}
    >
      <Wrapper {...wrapperProps}>
        {isShowTitle && (
          <motion.div key="navbar-yusr-muttaqien-animate" {...variants}>
            <YusrMuttaqien className={{ pathFill: 'fill-beige' }} />
          </motion.div>
        )}
      </Wrapper>
    </div>
  );
}
