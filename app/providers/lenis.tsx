'use client';

import { Lenis } from '@studio-freight/react-lenis';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return <Lenis root>{children}</Lenis>;
}
