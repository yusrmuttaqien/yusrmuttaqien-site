import { useRef } from 'react';
import { useRouter } from 'next/router';
import { useIsomorphicLayoutEffect, animate, inView } from 'framer-motion';
import { useTogglesStore } from '@/contexts/toggles';
import { useMediaQueryStore } from '@/contexts/mediaQuery';
import { TIMELINE_YM_TITLE } from '@/components/Navbar/constant';
import isTopFold from '@/utils/isTopFold';
import type { HostProps } from '@/components/Navbar/type';
import type { AnimationResumables } from '@/types/timeline';

export default function Host(props: HostProps) {
  const { scope } = props;
  const { asPath } = useRouter();
  const resumables = useRef<AnimationResumables>({ instance: null, status: 'not-ready' });
  const { isNavYM, set } = useTogglesStore((store) => ({ isNavYM: store.isNavYM, set: store.set }));
  const isXL1490 = useMediaQueryStore((store) => store.isXL1490);

  useIsomorphicLayoutEffect(() => {
    const root = scope.current as HTMLDivElement;
    const YMTitle = root.querySelector('#ym-title') as HTMLHeadingElement;

    if (!isXL1490) {
      YMTitle.classList.add('hidden');
    } else {
      YMTitle.classList.remove('hidden');
    }

    resumables.current.instance?.stop();
    resumables.current.instance =
      isNavYM && isXL1490
        ? animate(TIMELINE_YM_TITLE(scope).visible)
        : animate(TIMELINE_YM_TITLE(scope).invisible);
  }, [isNavYM, isXL1490]);
  useIsomorphicLayoutEffect(() => {
    const HeroYMTitle = document.querySelector('#hero-ym-title') as HTMLHeadingElement;
    const YMInView = inView(HeroYMTitle, _setNavYM);

    function _setNavYM(_: any, initial: boolean = false) {
      set('isNavYM', initial);

      return () => set('isNavYM', true);
    }

    _setNavYM(null, isTopFold(HeroYMTitle) || asPath !== '/');

    return YMInView;
  }, [asPath]);

  return null;
}
