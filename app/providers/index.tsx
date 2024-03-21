import { ReactNode } from 'react';
import AnimationSequenceProvider from '@/app/providers/animation-sequence';
import MediaQueryProvider from '@/app/providers/media-query';
import LenisProvider from '@/app/providers/lenis';
import MeasurementProvider from '@/app/providers/measurements';

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
