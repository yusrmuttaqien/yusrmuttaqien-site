import type { LinkProps as NextLinkProps } from 'next/link';
import type { ReactNode, HTMLAttributes } from 'react';

export type LinkProps = {
  children: ReactNode;
} & NextLinkProps &
  HTMLAttributes<HTMLAnchorElement>;
