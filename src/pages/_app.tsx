// TODO: Add global or hook scrollbar component
import Head from 'next/head';
import Script from 'next/script';
import { Fragment } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence } from 'framer-motion';
import Contexts from '@/contexts';
import MediaQueryStoreHost from '@/contexts/mediaQuery/host';
import useContent from '@/hooks/content';
import useApp from '@/hooks/app';
import Transition from '@/components/Transition';
import Cursor from '@/components/Cursor';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import ScrollUp from '@/components/ScrollUp';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps, router }: AppProps) {
  const { indexMetas } = useContent();

  useApp();

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Yusril Muttaqien" />
        <link
          href="/favicon-dark.ico"
          rel="shortcut icon"
          type="image/x-icon"
          media="(prefers-color-scheme: light)"
        />
        <link
          href="/favicon-light.ico"
          rel="shortcut icon"
          type="image/x-icon"
          media="(prefers-color-scheme: dark)"
        />
        <link
          href="/icon-dark.png"
          rel="apple-touch-icon image_src"
          type="image/png"
          media="(prefers-color-scheme: light)"
        />
        <link
          href="/icon-light.png"
          rel="apple-touch-icon image_src"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        />
        {
          // #region Changable head tags
        }
        <meta key="description" name="description" content={indexMetas.description} />
        <meta key="identifier" name="identifier" content="index" />
        <title key="title">Yusril Muttaqien</title>
        {
          // #endregion Changable head tags
        }
      </Head>
      <Contexts>
        <MediaQueryStoreHost />
        <Cursor className="z-40" />
        <Loader className="z-30" />
        <Navbar
          className={{
            navbar: 'mx-5 mt-5 z-20 mb-4 top-5 xl:top-8 xl:mx-8 xl:mt-[5.25rem] xl:mb-[3.25rem]',
            menu: 'z-[19] p-5',
          }}
        />
        <ScrollUp className="z-[18] right-5 bottom-5 xl:right-8 xl:bottom-8" />
        <div id="root-main" className="z-10 perspective-5000 isolate">
          <AnimatePresence mode="wait">
            <Transition key={router.route} className={{ main: 'mx-5 xl:mx-8' }}>
              <Component {...pageProps} />
            </Transition>
          </AnimatePresence>
        </div>
      </Contexts>
      <Script>{`window.history.scrollRestoration = "manual"`}</Script>
      <Analytics />
      <SpeedInsights />
    </Fragment>
  );
}
