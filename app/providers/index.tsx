import { ReactNode } from 'react';
import AnimationSequenceProvider from '@/app/providers/animation-sequence';
import MediaQueryProvider from '@/app/providers/media-query';
import LenisProvider from '@/app/providers/lenis';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MediaQueryProvider>
      <LenisProvider>
        <AnimationSequenceProvider>{children}</AnimationSequenceProvider>
      </LenisProvider>
    </MediaQueryProvider>
  );
}
