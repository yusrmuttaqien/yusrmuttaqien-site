'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { LenisOptions } from '@studio-freight/lenis';

export default function LenisProvider({
  children,
  options,
}: {
  children: React.ReactNode;
  options?: LenisOptions;
}) {
  return (
    <ReactLenis root options={options}>
      {children}
    </ReactLenis>
  );
}
