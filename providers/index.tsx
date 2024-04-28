import { ReactNode } from 'react';
import AnimationSequenceProvider from '@/providers/animation-sequence';
import MediaQueryProvider from '@/providers/media-query';
import LenisProvider from '@/providers/lenis';
import MeasurementProvider from '@/providers/measurements';
import type { ProvidersProps } from '@/types/providers';

export default function Providers(props: ProvidersProps) {
  const { children } = props;

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
