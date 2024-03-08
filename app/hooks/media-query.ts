import { useState, useEffect } from 'react';

export default function useMediaQuery(initialQuery: string) {
  const [query, setQuery] = useState(initialQuery);
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (!query) return;

    const _onChange = (mql: MediaQueryListEvent) => {
      setMatches(mql.matches);
    };

    const mql = window.matchMedia(query);

    setMatches(mql.matches);

    try {
      mql.addEventListener('change', _onChange);
    } catch {
      mql.addListener(_onChange);
    }

    return () => {
      try {
        mql.removeEventListener('change', _onChange);
      } catch {
        mql.removeListener(_onChange);
      }
    };
  }, [query]);

  return [matches, setQuery] as const;
}
