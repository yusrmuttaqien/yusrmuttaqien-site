'use client';

import { ElementType, HTMLAttributes } from 'react';
import { CustomDomComponent, motion } from 'framer-motion';
import classMerge from '@/app/utils/class-merge';
import { FRAMER_LAYOUT_YUSR_MUTTAQIEN } from '@/app/constants';

interface ComponentProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: ElementType;
  clasName?: string;
}

export default function YusrMuttaqien({ as = 'p', className }: ComponentProps) {
  const Tag: CustomDomComponent<ComponentProps> = motion(as);

  return (
    <Tag
      className={classMerge('font-nohemi font-extrabold block', className)}
      layoutId={FRAMER_LAYOUT_YUSR_MUTTAQIEN}
    >
      yusr.muttaqien
    </Tag>
  );
}
