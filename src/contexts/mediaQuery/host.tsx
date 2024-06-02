import { useState } from 'react';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useMediaQueryStore } from '@/contexts/mediaQuery';
import useMediaQuery from '@/hooks/mediaQuery';
import { scrSize } from '@/constants/tailwind-config';

export default function MediaQueryStoreHost() {
  const [revalidate, setRevalidate] = useState(0);
  const bulkUpdate = useMediaQueryStore((store) => store.bulkUpdate);
  const { match: isXL1490 } = useMediaQuery({
    query: `screen and (min-width: 1490px)`,
    revalidate,
  });
  const { match: isXL } = useMediaQuery({
    query: `screen and (min-width: ${scrSize({ screen: 'xl', withUnit: true })})`,
    revalidate,
  });
  const { match: isHoverable } = useMediaQuery({ query: `screen and (hover: hover)`, revalidate });
  const { match: isDarkMode } = useMediaQuery({
    query: `screen and (prefers-color-scheme: dark)`,
    revalidate,
  });

  useIsomorphicLayoutEffect(() => {
    if (!revalidate) {
      setRevalidate(Date.now());
    } else {
      bulkUpdate({ isXL, isHoverable, isValidated: true, isDarkMode, isXL1490 });
    }
  }, [isXL, isHoverable, isDarkMode, isXL1490]);

  return null;
}
