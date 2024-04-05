import Head from 'next/head';
import { Fragment } from 'react';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import Providers from '@/providers';
import Loader from '@/fragments/loader';
import Debugger from '@/fragments/debugger/debugger';
import Navbar from '@/fragments/navbar/navbar';
import classMerge from '@/utils/class-merge';
import { helveticaNeue, robotoMono, nohemi } from '@/constants/root-app';

import '@/styles/globals.css';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Yusril Muttaqien" />
        <meta name="description" content="View all my works and projects" key="description" />
        <title key="title">Yusril Muttaqien</title>
      </Head>
      <Providers>
        <Loader />
        <Debugger />
        <div
          className={classMerge(
            helveticaNeue.variable,
            robotoMono.variable,
            nohemi.variable,
            'font-helvetica-neue'
          )}
        >
          <Navbar />
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Providers>
    </Fragment>
  );
}
