import { useImmer } from 'use-immer';
import { createContext, useContext, ReactNode } from 'react';
import useMediaQuery from '@/hooks/media-query';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import deviceType from '@/utils/device-type';
import { MEDIA_QUERY_INITIAL_STATE } from '@/constants/media-query';
import { scrSize } from '@/constants/tailwind-config';
import type { MediaQueryState } from '@/types/media-query';

const MediaQueryContext = createContext<MediaQueryState>(MEDIA_QUERY_INITIAL_STATE);

export default function MediaQueryProvider({ children }: { children: ReactNode }) {
  const isScreenLargeDesktop = useMediaQuery(`screen and (min-width: ${scrSize('2xl', true)})`);
  const isScreenDesktop = useMediaQuery(`screen and (min-width: ${scrSize('xl', true)})`);
  const isScreenTablet = useMediaQuery(`screen and (min-width: ${scrSize('lg', true)})`);
  const isScreenFrom550 = useMediaQuery(`screen and (min-width: ${scrSize('from-550', true)})`);
  const isHover = useMediaQuery(`screen and (hover: hover)`);
  const [state, setState] = useImmer(MEDIA_QUERY_INITIAL_STATE);

  useIsomorphicLayoutEffect(() => {
    const device = deviceType();

    if (
      !isScreenLargeDesktop[1] &&
      !isScreenDesktop[1] &&
      !isScreenTablet[1] &&
      !isScreenFrom550[1] &&
      !isHover[1]
    ) {
      return;
    }

    setState((draft) => {
      draft.isBruteCheck = true;
      draft.isScreenTablet = isScreenTablet[0];
      draft.isScreenFrom550 = isScreenFrom550[0];
      draft.isHover = isHover[0];
      draft.isScreenLargeDesktop = isScreenLargeDesktop[0];
      draft.isScreenDesktop = isScreenDesktop[0];
      draft.isDeviceMobile = device === 'mobile';
    });
  }, [isScreenTablet, isHover, isScreenLargeDesktop, isScreenDesktop, isScreenFrom550]);

  return <MediaQueryContext.Provider value={state}>{children}</MediaQueryContext.Provider>;
}

export function useMediaQueryCtx() {
  return useContext(MediaQueryContext);
}
