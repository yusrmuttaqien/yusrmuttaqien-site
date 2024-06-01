import type { LinkProps as NextLinkProps } from 'next/link';
import type { ReactNode, HTMLAttributes } from 'react';

export type LinkProps = {
  children: ReactNode;
  isDisabled?: boolean;
  look?: 'arrow' | 'custom';
  isActive?: boolean;
} & NextLinkProps &
  HTMLAttributes<HTMLAnchorElement>;
