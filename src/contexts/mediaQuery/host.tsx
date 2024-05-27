import { useState } from 'react';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useMediaQueryStore } from '@/contexts/mediaQuery';
import useMediaQuery from '@/hooks/mediaQuery';
import { scrSize } from '@/constants/tailwind-config';

export default function MediaQueryStoreHost() {
  const [revalidate, setRevalidate] = useState(0);
  const bulkUpdate = useMediaQueryStore((store) => store.bulkUpdate);
  const { match: isXL } = useMediaQuery({
    query: `screen and (min-width: ${scrSize({ screen: 'xl', withUnit: true })})`,
  });
  const { match: isHoverable } = useMediaQuery({ query: `screen and (hover: hover)`, revalidate });

  useIsomorphicLayoutEffect(() => {
    if (!revalidate) {
      setRevalidate(Date.now());
    } else {
      bulkUpdate({ isXL, isHoverable, isValidated: true });
    }
  }, [isXL, isHoverable]);

  return null;
}
