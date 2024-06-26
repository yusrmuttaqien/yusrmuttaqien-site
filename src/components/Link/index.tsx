import NextLink from 'next/link';
import { motion } from 'framer-motion';
import { tv } from 'tailwind-variants';
import { useRouter } from 'next/router';
import { useLenis } from '@studio-freight/react-lenis';
import { useMeasuresStore } from '@/contexts/measures';
import ArrowLook from '@/components/Link/fragments/ArrowLook';
import { EXTERNAL_LINKS } from '@/components/Link/constant';
import classMerge from '@/utils/classMerge';
import type { LinkProps } from '@/components/Link/type';
import type { MouseEvent } from 'react';

export const LINK_STYLES = tv({
  slots: {
    a: '',
  },
});

export default function Link(props: LinkProps) {
  const {
    onClick,
    href,
    look = 'arrow',
    children,
    isDisabled,
    isActive,
    className,
    motionWrapper,
    scroll = false,
    ...rest
  } = props;
  const { navbarHeight, navbarTop } = useMeasuresStore((state) => ({
    navbarHeight: state.navbarHeight,
    navbarTop: state.navbarTop,
  }));
  const { asPath } = useRouter();
  const lenis = useLenis();
  const { a } = LINK_STYLES();

  function _interceptLink(e: MouseEvent<HTMLAnchorElement>) {
    const isExternal = EXTERNAL_LINKS.some((link) => href.toString().includes(link));
    const isCurrent = href.toString() === asPath;
    const isID = href.toString().includes('#');

    if (isExternal) {
      e.preventDefault();
      return window.open(href.toString(), '_blank');
    }
    if (!isCurrent || !isID) return;
    const endpoints = href.toString().split('#');

    e.preventDefault();
    lenis?.scrollTo(`#${endpoints[1]}`, { offset: -(navbarHeight + navbarTop * 2), duration: 1.8 });
  }
  function _onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (isDisabled || isActive) {
      e.preventDefault();
      return;
    }

    onClick?.(e);
    _interceptLink(e);
  }

  return (
    <motion.div {...motionWrapper}>
      <NextLink
        {...rest}
        className={a({
          className: classMerge('block', isDisabled && 'cursor-default', className?.link?.a),
        })}
        onClick={_onClick}
        href={isDisabled ? '#' : href}
        scroll={scroll}
      >
        {look === 'arrow' ? (
          <ArrowLook isActive={isActive} isDisabled={isDisabled} className={className?.arrowLook}>
            {children}
          </ArrowLook>
        ) : (
          children
        )}
      </NextLink>
    </motion.div>
  );
}
