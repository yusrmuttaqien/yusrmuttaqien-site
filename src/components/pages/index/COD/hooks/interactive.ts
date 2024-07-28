import { useRef } from 'react';
import { animate, useIsomorphicLayoutEffect } from 'framer-motion';
import { Application } from '@splinetool/runtime';
import { useMediaQueryStore } from '@/contexts/mediaQueries';
import { EASE_OUT_QUART } from '@/constants/motion';
import { COLOR_BEIGE, COLOR_GREY } from '@/constants/tailwind-config';
import type { InteractiveParams } from '@/components/pages/index/COD/type';

export default function useInteractive(params: InteractiveParams) {
  const { COORDS } = params;
  const isDarkMode = useMediaQueryStore((state) => state.isDarkMode);
  const wrapper = useRef<HTMLDivElement>(null);
  const spline = useRef<Application>();
  const currentStep = useRef(0);

  function _cycle() {
    const runtime = spline.current;
    const step = (currentStep.current + 1) % Object.keys(COORDS).length;
    const preset = COORDS[Object.keys(COORDS)[step] as keyof typeof COORDS];
    const presetName = Object.keys(COORDS)[step] as keyof typeof COORDS;

    if (presetName !== 'reset') {
      wrapper.current?.classList.add('pointer-events-none');
    } else {
      wrapper.current?.classList.remove('pointer-events-none');
    }

    preset.forEach(([key, value]) => {
      const past = runtime?.getVariable(key as string);

      animate(past, value, {
        duration: 0.5,
        ease: EASE_OUT_QUART,
        onUpdate(num) {
          const v = num as number;

          runtime?.setVariable(key as string, v);
        },
      });
    });

    currentStep.current = step;
  }
  function _syncBGColor() {
    const runtime = spline.current;

    runtime?.setBackgroundColor(isDarkMode ? COLOR_GREY.DEFAULT : COLOR_BEIGE.DEFAULT);
  }

  useIsomorphicLayoutEffect(() => {
    _syncBGColor();
  }, [isDarkMode]);

  return { wrapper, spline, cycle: _cycle, syncBGColor: _syncBGColor };
}
