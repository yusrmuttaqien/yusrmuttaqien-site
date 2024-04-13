import { useState, useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import { CHECK_QUERY_TRIES } from '@/constants/media-query';

export default function useMediaQuery(query: string) {
  const tries = useRef(0);
  const [matches, setMatches] = useState<boolean | undefined>(undefined);
  const [isBruteCheck, setBruteCheck] = useState<boolean>(false);

  useIsomorphicLayoutEffect(() => {
    if (!query) return;
    const mql = window.matchMedia(query);

    function checkQuery(mql: MediaQueryListEvent) {
      setMatches(mql.matches);
    }
    function bruteCheckQuery() {
      setMatches(mql.matches);
      tries.current += 1;

      if (tries.current > CHECK_QUERY_TRIES) {
        setBruteCheck(true);
        return;
      } else {
        requestAnimationFrame(bruteCheckQuery);
      }
    }

    mql.addEventListener('change', checkQuery);
    bruteCheckQuery();

    return () => {
      mql.removeEventListener('change', checkQuery);
    };
  }, [query]);

  return [matches, isBruteCheck];
}
