import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useLenis } from '@studio-freight/react-lenis';
import { useMeasurementCtx } from '@/providers/measurements';
import { EXTERNAL_LINKS } from '@/constants/link';
import type { LinkProps } from '@/types/link';
import type { MouseEvent } from 'react';
import type { Url } from 'next/dist/shared/lib/router/router';

export default function Link({ onClick, href, ...rest }: LinkProps) {
  const {
    state: { navbarHeight },
  } = useMeasurementCtx();
  const lenis = useLenis(() => {});
  const { asPath } = useRouter();

  function _localID(e: MouseEvent<HTMLAnchorElement>, href: Url) {
    if (!href.toString().includes('#')) return false;
    const endpoints = href.toString().split('#');
    const isCurrentPath = endpoints[0] === asPath;

    if (isCurrentPath) {
      e.preventDefault();
      lenis?.scrollTo('#' + endpoints[1], { offset: -(navbarHeight || 0), duration: 1.8 });
    }

    return isCurrentPath;
  }
  function _onClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);

    if (EXTERNAL_LINKS.some((l) => href.toString().includes(l)) || _localID(e, href)) return;
  }

  return <NextLink {...rest} onClick={_onClick} href={href} />;
}
