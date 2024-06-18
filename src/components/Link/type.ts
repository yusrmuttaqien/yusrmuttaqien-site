import { LINK_STYLES } from '@/components/Link';
import type { ArrowLookProps } from '@/components/Link/fragments/ArrowLook/type';
import type { LinkProps as NextLinkProps } from 'next/link';
import type { ReactNode, AnchorHTMLAttributes } from 'react';

type ClassName = {
  link: typeof LINK_STYLES.slots;
  arrowLook: ArrowLookProps['className'];
};

export type LinkProps = {
  children: ReactNode;
  isDisabled?: boolean;
  look?: 'arrow' | 'custom';
  isActive?: boolean;
  className?: Partial<ClassName>;
} & Omit<NextLinkProps, 'className'> &
  Omit<Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>, 'className'>;
