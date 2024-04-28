import { useState } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import type { MediaQueryProps } from '@/types/media-query';

export default function useMediaQuery(props: MediaQueryProps) {
  const { query, revalidate } = props;
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    if (!query) return;
    const mql = window.matchMedia(query);

    function _query(mql: MediaQueryListEvent) {
      setMatches(mql.matches);
    }

    mql.addEventListener('change', _query);
    setMatches(mql.matches);

    return () => {
      mql.removeEventListener('change', _query);
    };
  }, [query, revalidate]);

  return { match: matches };
}
