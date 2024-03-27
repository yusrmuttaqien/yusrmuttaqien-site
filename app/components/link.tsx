'use client';

import Nextlink from 'next/link';
import { usePathname } from 'next/navigation';
import { useAnimationSequenceCtx } from '@/app/providers/animation-sequence';
import type { MouseEvent } from 'react';
import type { LinkProps } from '@/app/types/link';
import { Url } from 'next/dist/shared/lib/router/router';

export default function Link({ children, onClick, announcing = true, href, ...rest }: LinkProps) {
  const { setState } = useAnimationSequenceCtx();
  const pathname = usePathname();

  function _localIdOrExternal(href: Url) {
    // NOTE: for non string (UrlObject)
    if (['#', 'http', 'www', 'mailto'].some((str) => (href as string).includes(str))) return true;

    const endpoints = (href as string).split('#');
    return endpoints[0] === pathname;
  }
  function _overrideOnClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick && onClick(e);

    !_localIdOrExternal(href) &&
      setState((draft) => {
        draft.announcing = announcing;
      });
  }

  return (
    <Nextlink href={href} {...rest} onClick={_overrideOnClick}>
      {children}
    </Nextlink>
  );
}
