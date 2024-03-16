import { SpeedInsights } from '@vercel/speed-insights/next';
import Providers from '@/app/providers';
import Navbar from '@/app/fragments/navbar/navbar';
import Footer from '@/app/fragments/footer/footer';
import classMerge from '@/app/utils/class-merge';
import { helveticaNeue, robotoMono } from '@/app/constants/root-layout';
import type { RootLayoutProps } from '@/app/types/root-layout';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Yusril Muttaqien',
    default: 'Yusril Muttaqien',
  },
  description: 'View all my works and projects.',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      className="unhoverable:min-w-80 hoverable:min-w-[calc(20rem-0.6875rem)] antialiased"
      lang="en"
    >
      <body
        className={classMerge(
          helveticaNeue.variable,
          robotoMono.variable,
          'font-helvetica-neue min-w-full',
          'bg-beige dark:bg-grey',
          'text-grey dark:text-beige'
        )}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
