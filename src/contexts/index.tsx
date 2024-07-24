import { ReactLenis } from '@studio-freight/react-lenis';
import TogglesStoreProvider from '@/contexts/toggles';
import MeasuresStoreProvider from '@/contexts/measures';
import MediaQueryStoreProvider from '@/contexts/mediaQueries';
import StaticsProvider from '@/contexts/statics';

export default function Contexts({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ duration: 0.5 }}>
      <StaticsProvider>
        <MediaQueryStoreProvider>
          <TogglesStoreProvider>
            <MeasuresStoreProvider>{children}</MeasuresStoreProvider>
          </TogglesStoreProvider>
        </MediaQueryStoreProvider>
      </StaticsProvider>
    </ReactLenis>
  );
}
