import localFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
import classMerge from '@/app/utils/class-merge';
import type { Metadata } from 'next';
import './globals.css';

type Props = Readonly<{
  children: React.ReactNode;
}>;
const helveticaNeue = localFont({
  src: [
    {
      style: 'normal',
      path: './fonts/HelveticaNeue-Roman.woff',
      weight: '400',
    },
    {
      style: 'normal',
      path: './fonts/HelveticaNeue-Thin.woff',
      weight: '200',
    },
    {
      style: 'normal',
      path: './fonts/HelveticaNeue-Medium.woff',
      weight: '500',
    },
    {
      style: 'normal',
      path: './fonts/HelveticaNeue-Bold.woff',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-helvetica-neue',
});
const nohemi = localFont({
  src: './fonts/Nohemi-ExtraBold.woff',
  display: 'swap',
  style: 'normal',
  weight: '800',
  variable: '--font-nohemi',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Yusril Muttaqien',
    default: 'Yusril Muttaqien',
  },
  description: 'View all my works and projects.',
};

export default function RootLayout({ children }: Props) {
  return (
    <html className="min-w-80" lang="en">
      <body
        className={classMerge(
          helveticaNeue.variable,
          nohemi.variable,
          'font-helvetica min-w-full',
          'bg-beige dark:bg-grey',
          'text-grey dark:text-beige'
        )}
      >
        <Navbar />
        {children}
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
