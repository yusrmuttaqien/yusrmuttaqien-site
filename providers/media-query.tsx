import { useImmer } from 'use-immer';
import { createContext, useContext, ReactNode } from 'react';
import useMediaQuery from '@/hooks/media-query';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import { MEDIA_QUERY_INITIAL_STATE } from '@/constants/media-query';
import { scrSize } from '@/constants/tailwind-config';
import type { MediaQueryState } from '@/types/media-query';

const MediaQueryContext = createContext<MediaQueryState>(MEDIA_QUERY_INITIAL_STATE);

export default function MediaQueryProvider({ children }: { children: ReactNode }) {
  const [isLargeDesktop] = useMediaQuery(`screen and (min-width: ${scrSize('2xl', true)})`);
  const [isDesktop] = useMediaQuery(`screen and (min-width: ${scrSize('xl', true)})`);
  const [isTablet] = useMediaQuery(`screen and (min-width: ${scrSize('lg', true)})`);
  const [isHover] = useMediaQuery(`screen and (hover: hover)`);
  const [state, setState] = useImmer(MEDIA_QUERY_INITIAL_STATE);

  useIsomorphicLayoutEffect(() => {
    setState((draft) => {
      draft.isTablet = isTablet;
      draft.isHover = isHover;
      draft.isLargeDesktop = isLargeDesktop;
      draft.isDesktop = isDesktop;
    });
  }, [isTablet, isHover, isLargeDesktop, isDesktop]);

  return <MediaQueryContext.Provider value={state}>{children}</MediaQueryContext.Provider>;
}

export function useMediaQueryCtx() {
  return useContext(MediaQueryContext);
}
