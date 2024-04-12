import type { LinkProps as NextLinkProps } from 'next/link';
import type { ReactNode } from 'react';

export type LinkProps = {
  children: ReactNode;
} & NextLinkProps;
