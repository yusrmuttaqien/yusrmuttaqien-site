'use client';

import Nextlink from 'next/link';
import { useLenis } from '@studio-freight/react-lenis';
import { usePathname, useRouter } from 'next/navigation';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import { useMeasurementCtx } from '@/app/providers/measurements';
import { ID_LOADER_EXIT } from '@/app/constants/loader';
import { EXTERNAL_LINKS } from '@/app/constants/link';
import type { MouseEvent } from 'react';
import type { LinkProps } from '@/app/types/link';
import type { Url } from 'next/dist/shared/lib/router/router';

export default function Link({
  children,
  onClick,
  announcing = true,
  href,
  replace,
  scroll,
  ...rest
}: LinkProps) {
  const { setState } = useAnimationSequenceCtx();
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
    isLocalId && lenis?.scrollTo(`#${endpoints[1]}`, { offset: (navbarTotalHeight || 0) * -1 });

    return isLocalId;
  }
  function _overrideOnClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);

    if (EXTERNAL_LINKS.some((str) => (href as string).includes(str))) return;
    if (_localId(e, href)) return;
    e.preventDefault();

    const loaderExitEl = document.getElementById(ID_LOADER_EXIT);
    const mainEl = document.getElementsByTagName('main')[0];

    function animationEnd() {
      const method = replace ? router.replace : router.push;

      setState((draft) => {
        draft.announcing = announcing;
        draft.isLoader = true;
      });
      loaderExitEl?.removeEventListener('animationend', animationEnd);
      method(href as string, { scroll });
    }

    // NOTE: Move to hooks?
    loaderExitEl?.addEventListener('animationend', animationEnd);
    mainEl.classList.add('origin-bottom');
    mainEl.classList.add('animate-main-push-up-hide');
    loaderExitEl?.classList.add('animate-loader-exit-push-up-show');
    loaderExitEl?.classList.add('after:animate-loader-exit-backdrop-show');
  }

  return (
    <Nextlink {...rest} href={href} replace={replace} scroll={scroll} onClick={_overrideOnClick}>
      {children}
    </Nextlink>
  );
}
