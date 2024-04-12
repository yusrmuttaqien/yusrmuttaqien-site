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
  const isHover = useMediaQuery(`screen and (hover: hover)`);
  const [state, setState] = useImmer(MEDIA_QUERY_INITIAL_STATE);

  useIsomorphicLayoutEffect(() => {
    const device = deviceType();

    setState((draft) => {
      draft.isScreenTablet = isScreenTablet;
      draft.isHover = isHover;
      draft.isScreenLargeDesktop = isScreenLargeDesktop;
      draft.isScreenDesktop = isScreenDesktop;
      draft.isDeviceMobile = device === 'mobile';
    });
  }, [isScreenTablet, isHover, isScreenLargeDesktop, isScreenDesktop]);

  return <MediaQueryContext.Provider value={state}>{children}</MediaQueryContext.Provider>;
}

export function useMediaQueryCtx() {
  return useContext(MediaQueryContext);
}
