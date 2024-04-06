import { ReactNode } from 'react';
import AnimationSequenceProvider from '@/providers/animation-sequence';
import MediaQueryProvider from '@/providers/media-query';
import LenisProvider from '@/providers/lenis';
import MeasurementProvider from '@/providers/measurements';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MediaQueryProvider>
      <LenisProvider>
        <MeasurementProvider>
          <AnimationSequenceProvider>{children}</AnimationSequenceProvider>
        </MeasurementProvider>
      </LenisProvider>
    </MediaQueryProvider>
  );
}
