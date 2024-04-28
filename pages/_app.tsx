import Head from 'next/head';
import { Fragment } from 'react';
import { AnimatePresence } from 'framer-motion';
import Providers from '@/providers';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import Loader from '@/fragments/loader';
import Announcer from '@/fragments/announcer';
import Navbar from '@/fragments/navbar/navbar';
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
        <title key="title">Yusril Muttaqien</title>
      </Head>
      <Providers>
        <Announcer />
        <Loader />
        <Navbar />
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Providers>
    </Fragment>
  );
}
