import localFont from 'next/font/local';
import { Roboto_Mono } from 'next/font/google';

export const helveticaNeue = localFont({
  src: [
    {
      style: 'normal',
      path: '../fonts/HelveticaNeue-Roman.woff',
      weight: '400',
    },
    {
      style: 'normal',
      path: '../fonts/HelveticaNeue-Thin.woff',
      weight: '200',
    },
    {
      style: 'normal',
      path: '../fonts/HelveticaNeue-Medium.woff',
      weight: '500',
    },
    {
      style: 'normal',
      path: '../fonts/HelveticaNeue-Bold.woff',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-helvetica-neue',
});

export const nohemi = localFont({
  style: 'normal',
  src: '../fonts/Nohemi-ExtraBold.woff',
  weight: '800',
  display: 'swap',
  variable: '--font-nohemi',
});

export const robotoMono = Roboto_Mono({
  weight: '500',
  display: 'swap',
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});
