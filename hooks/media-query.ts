import { useState } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';

export default function useMediaQuery(query: string, revalidate?: number) {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    if (!query) return;
    const mql = window.matchMedia(query);

    function checkQuery(mql: MediaQueryListEvent) {
      setMatches(mql.matches);
    }

    mql.addEventListener('change', checkQuery);
    setMatches(mql.matches);

    return () => {
      mql.removeEventListener('change', checkQuery);
    };
  }, [query, revalidate]);

  return matches;
}
