import { useImmer } from 'use-immer';
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import useMediaQuery from '@/hooks/media-query';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import debounce from '@/utils/debounce';
import deviceType from '@/utils/device-type';
import { MEDIA_QUERY_INITIAL_STATE } from '@/constants/media-query';
import { scrSize } from '@/constants/tailwind-config';
import type { MediaQueryInitialState, MediaQueryProviderProps } from '@/types/media-query';

const MediaQueryContext = createContext<MediaQueryInitialState>(MEDIA_QUERY_INITIAL_STATE);

export default function MediaQueryProvider(props: MediaQueryProviderProps) {
  const { children } = props;
  const [revalidate, setRevalidate] = useState(0);
  const { match: isScreenLargeDesktop } = useMediaQuery({
    query: `screen and (min-width: ${scrSize('2xl', true)})`,
    revalidate,
  });
  const { match: isScreenDesktop } = useMediaQuery({
    query: `screen and (min-width: ${scrSize('xl', true)})`,
    revalidate,
  });
  const { match: isScreenTablet } = useMediaQuery({
    query: `screen and (min-width: ${scrSize('lg', true)})`,
    revalidate,
  });
  const { match: isScreenFrom550 } = useMediaQuery({
    query: `screen and (min-width: ${scrSize('from-550', true)})`,
    revalidate,
  });
  const { match: isHover } = useMediaQuery({ query: `screen and (hover: hover)`, revalidate });
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
  useIsomorphicLayoutEffect(() => {
    const debouncedCheck = debounce(_check, 100);

    function _check() {
      const device = deviceType();

      setState((draft) => {
        draft.isDeviceMobile = device === 'mobile';
      });
    }

    window.addEventListener('resize', debouncedCheck);
    _check();

    return () => {
      window.removeEventListener('resize', debouncedCheck);
    };
  }, []);
  useEffect(() => {
    if (!revalidate) return;

    setState((draft) => {
      draft.isValidated = true;
    });
  }, [revalidate]);

  return <MediaQueryContext.Provider value={state}>{children}</MediaQueryContext.Provider>;
}

export function useMediaQueryCtx() {
  return useContext(MediaQueryContext);
}
