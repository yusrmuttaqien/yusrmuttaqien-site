import Head from 'next/head';
import { Fragment } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AnimatePresence, useIsomorphicLayoutEffect } from 'framer-motion';
import Contexts from '@/contexts';
import MediaQueryStoreHost from '@/contexts/mediaQuery/host';
import Transition from '@/components/Transition';
import Cursor from '@/components/Cursor';
import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import ScrollUp from '@/components/ScrollUp';
import { helveticaNeue, nohemi } from '@/constants/_app';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps, router }: AppProps) {
  useIsomorphicLayoutEffect(() => {
    const body = document.body;

    body.classList.add(helveticaNeue.variable, nohemi.variable);
  }, []);

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Yusril Muttaqien" />
        <meta
          name="description"
          content="View my diverse portfolio of frontend development, UI/UX design, and creative projects."
          key="description"
        />
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
        <title key="title">Yusril Muttaqien</title>
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
            <Transition key={router.route} className={{ main: 'mx-5 origin-center xl:mx-8' }}>
              <Component {...pageProps} />
            </Transition>
          </AnimatePresence>
        </div>
      </Contexts>
      <SpeedInsights />
    </Fragment>
  );
}
