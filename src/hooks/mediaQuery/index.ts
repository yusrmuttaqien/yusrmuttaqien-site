import { useState } from 'react';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { MediaQueryParam } from '@/hooks/mediaQuery/type';

export default function useMediaQuery(params: MediaQueryParam) {
  const { query, revalidate } = params;
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
