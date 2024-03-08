import { ReactNode } from 'react';
import AnimationSequenceProvider from '@/app/providers/animation-sequence';
import MediaQueryProvider from '@/app/providers/media-query';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MediaQueryProvider>
      <AnimationSequenceProvider>{children}</AnimationSequenceProvider>
    </MediaQueryProvider>
  );
}
