import { useState, useLayoutEffect } from 'react';

export default function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useLayoutEffect(() => {
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

  return [matches] as const;
}
