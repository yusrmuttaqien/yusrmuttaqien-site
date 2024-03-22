import type { CSSProperties } from 'react';
import { useMediaQueryCtx } from '@/app/providers/media-query';
import { type MotionValue, useTransform } from 'framer-motion';

export default function useProjectViewerHeaderTransformer(scroller: MotionValue<number>) {
  const { isLargeDesktop } = useMediaQueryCtx();
  const posHeader = useTransform(scroller, [0, 0.03], ['0%', '5%']);
  const opacityHeader = useTransform(scroller, [0, 0.03], [1, 0]);

  return isLargeDesktop
    ? {
        style: {
          '--pos-header': posHeader,
          '--opacity-header': opacityHeader,
        } as CSSProperties,
        className: 'translate-x-[var(--pos-header)]',
      }
    : {
        style: {
          '--pos-header': posHeader,
          '--opacity-header': opacityHeader,
        } as CSSProperties,
        className: 'translate-y-[var(--pos-header)]',
      };
}
