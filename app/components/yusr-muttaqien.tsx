'use client';

import { ElementType, HTMLAttributes } from 'react';
import { CustomDomComponent, motion } from 'framer-motion';
import { tv } from 'tailwind-variants';
import { FRAMER_LAYOUT_YUSR_MUTTAQIEN } from '@/app/constants';

interface ComponentProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: ElementType;
  clasName?: string;
}

export default function YusrMuttaqien({ as = 'p', className }: ComponentProps) {
  const Tag: CustomDomComponent<ComponentProps> = motion(as);
  const styles = tv({ base: 'font-nohemi font-extrabold' });

  return (
    <Tag className={styles({ className })} layoutId={FRAMER_LAYOUT_YUSR_MUTTAQIEN}>
      yusr.muttaqien
    </Tag>
  );
}
