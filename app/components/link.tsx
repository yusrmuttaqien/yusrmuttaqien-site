'use client';

import Nextlink from 'next/link';
import { LinkProps } from '@/app/types/link';

export default function Link({ children, href, ...rest }: LinkProps) {
  return (
    <Nextlink href={href} {...rest}>
      {children}
    </Nextlink>
  );
}
