import localFont from 'next/font/local';
import { tv } from 'tailwind-variants';
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';
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
const styles = tv({
  base: [
    helveticaNeue.variable,
    nohemi.variable,
    'font-helvetica',
    'bg-beige dark:bg-grey',
    'text-grey dark:text-beige',
  ],
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
    <html lang="en">
      <body className={styles()}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
