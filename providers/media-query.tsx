import { useImmer } from 'use-immer';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import useMediaQuery from '@/hooks/media-query';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import debounce from '@/utils/debounce';
import deviceType from '@/utils/device-type';
import { MEDIA_QUERY_INITIAL_STATE } from '@/constants/media-query';
import { scrSize } from '@/constants/tailwind-config';
import type { MediaQueryInitialState } from '@/types/media-query';

const MediaQueryContext = createContext<MediaQueryInitialState>(MEDIA_QUERY_INITIAL_STATE);

export default function MediaQueryProvider({ children }: { children: ReactNode }) {
  const [revalidate, setRevalidate] = useState(0);
  const isScreenLargeDesktop = useMediaQuery(
    `screen and (min-width: ${scrSize('2xl', true)})`,
    revalidate
  );
  const isScreenDesktop = useMediaQuery(
    `screen and (min-width: ${scrSize('xl', true)})`,
    revalidate
  );
  const isScreenTablet = useMediaQuery(
    `screen and (min-width: ${scrSize('lg', true)})`,
    revalidate
  );
  const isScreenFrom550 = useMediaQuery(
    `screen and (min-width: ${scrSize('from-550', true)})`,
    revalidate
  );
  const isHover = useMediaQuery(`screen and (hover: hover)`);
  const [state, setState] = useImmer(MEDIA_QUERY_INITIAL_STATE);

  useIsomorphicLayoutEffect(() => {
    setRevalidate(Date.now());
    setState((draft) => {
      draft.isScreenTablet = isScreenTablet;
      draft.isScreenFrom550 = isScreenFrom550;
      draft.isHover = isHover;
      draft.isScreenLargeDesktop = isScreenLargeDesktop;
      draft.isScreenDesktop = isScreenDesktop;
    });
  }, [isScreenTablet, isHover, isScreenLargeDesktop, isScreenDesktop, isScreenFrom550]);
  useEffect(() => {
    if (!revalidate) return;

    setState((draft) => {
      draft.isValidated = true;
    });
  }, [revalidate]);
  useIsomorphicLayoutEffect(() => {
    const debouncedCheck = debounce(check, 100);

    function check() {
      const device = deviceType();

      setState((draft) => {
        draft.isDeviceMobile = device === 'mobile';
      });
    }

    window.addEventListener('resize', debouncedCheck);
    check();

    return () => {
      window.removeEventListener('resize', debouncedCheck);
    };
  }, []);

  return <MediaQueryContext.Provider value={state}>{children}</MediaQueryContext.Provider>;
}

export function useMediaQueryCtx() {
  return useContext(MediaQueryContext);
}
