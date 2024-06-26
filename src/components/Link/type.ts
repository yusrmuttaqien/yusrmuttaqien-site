import { LINK_STYLES } from '@/components/Link';
import type { HTMLMotionProps } from 'framer-motion';
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
  motionWrapper?: HTMLMotionProps<'div'>;
} & Omit<NextLinkProps, 'className' | 'style'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps | 'className' | 'style'>;
