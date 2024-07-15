import { useState } from 'react';
import { useMotionValue, useIsomorphicLayoutEffect, type MotionStyle } from 'framer-motion';
import type { InteractiveParams } from '@/components/pages/projects/Lists/fragments/ListContent/type';

export default function useInteractive(props: InteractiveParams) {
  const { activeContent, title } = props;
  const [isExtended, setIsExtended] = useState(false);
  const titleY = useMotionValue('0%');
  const titleOpacity = useMotionValue(1);
  const btnCrossY = useMotionValue('-200%');
  const btnCrossOpacity = useMotionValue(0);

  useIsomorphicLayoutEffect(() => {
    activeContent.on('change', (v: string) => {
      const isExtended = v === title;
      setIsExtended(isExtended);

      if (isExtended) {
        titleY.set('100%');
        titleOpacity.set(0);
        btnCrossY.set('0%');
        btnCrossOpacity.set(1);
      } else {
        titleY.set('0%');
        titleOpacity.set(1);
        btnCrossY.set('-200%');
        btnCrossOpacity.set(0);
      }
    });

    return () => {
      activeContent.clearListeners();
    };
  }, []);

  return {
    titleStyles: { y: titleY, opacity: titleOpacity } as MotionStyle,
    btnCrossStyles: { y: btnCrossY, opacity: btnCrossOpacity } as MotionStyle,
    isExtended,
  };
}
