import { useState } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    const mql = window.matchMedia(query);

    function checkQuery(mql: MediaQueryListEvent) {
      setMatches(mql.matches);
    }
    function cleanup() {
      mql.removeEventListener('change', checkQuery);
    }

    if (!query) return cleanup;

    setMatches(mql.matches);
    mql.addEventListener('change', checkQuery);

    return cleanup;
  }, [query]);

  return matches;
}
