import Head from 'next/head';
import { Fragment } from 'react';
import { AnimatePresence } from 'framer-motion';
import Providers from '@/providers';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import Loader from '@/fragments/loader';
import Announcer from '@/fragments/announcer';
import Navbar from '@/fragments/navbar/navbar';
// import Footer from '@/fragments/footer/footer';
import Transition from '@/fragments/transition';
import { helveticaNeue, robotoMono, nohemi } from '@/constants/app';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App(props: AppProps) {
  const { Component, pageProps, router } = props;

  useIsomorphicLayoutEffect(() => {
    document.body.classList.add(helveticaNeue.variable, robotoMono.variable, nohemi.variable);
  }, []);

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Yusril Muttaqien" />
        <meta name="description" content="View all my works and projects" key="description" />
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
      <Providers>
        <Announcer />
        <Loader />
        <Navbar />
        <AnimatePresence mode="wait" initial={false}>
          <Transition key={router.route} className="z-10 bg-beige-dynamic-[]">
            <Component {...pageProps} />
          </Transition>
        </AnimatePresence>
        {/* <Footer /> */}
      </Providers>
    </Fragment>
  );
}
