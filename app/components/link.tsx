'use client';

import Nextlink from 'next/link';
import { useLenis } from '@studio-freight/react-lenis';
import { usePathname, useRouter } from 'next/navigation';
import { useMeasurementCtx } from '@/app/providers/measurements';
import usePageTransition from '@/app/hooks/page-transition';
import { EXTERNAL_LINKS } from '@/app/constants/link';
import type { MouseEvent } from 'react';
import type { LinkProps } from '@/app/types/link';
import type { Url } from 'next/dist/shared/lib/router/router';

export default function Link({ children, onClick, href, replace, scroll, ...rest }: LinkProps) {
  const { start } = usePageTransition();
  const {
    state: { navbarTotalHeight },
  } = useMeasurementCtx();
  const lenis = useLenis(() => {});
  const pathname = usePathname();
  const router = useRouter();

  function _localId(e: MouseEvent<HTMLAnchorElement>, href: Url) {
    if (!(href as string).includes('#')) return;

    const hrefWithoutLocale = (href as string).split('/');
    hrefWithoutLocale.splice(1, 0, pathname.split('/')[1]);

    const hrefWithLocale = hrefWithoutLocale.join('/').replace('/#', '#');
    const endpoints = hrefWithLocale.split('#');
    const isLocalId = endpoints[0] === pathname;

    isLocalId && e.preventDefault();
    isLocalId &&
      lenis?.scrollTo(`#${endpoints[1]}`, { offset: (navbarTotalHeight || 0) * -1, duration: 1.8 });

    return isLocalId;
  }
  function _overrideOnClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);

    if (EXTERNAL_LINKS.some((str) => (href as string).includes(str))) return;
    if (_localId(e, href)) return;
    e.preventDefault();

    function redirect() {
      const method = replace ? router.replace : router.push;
      requestAnimationFrame(() => method(href as string, { scroll }));
    }

    start({ after: redirect });
  }

  return (
    <Nextlink {...rest} href={href} replace={replace} scroll={scroll} onClick={_overrideOnClick}>
      {children}
    </Nextlink>
  );
}
