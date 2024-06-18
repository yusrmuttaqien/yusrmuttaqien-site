import Head from 'next/head';
import { Fragment } from 'react';
import SectionBox from '@/components/SectionBox';

const SECTION_BOX_STYLES = { container: 'lg:flex-col lg:gap-4' };

export default function About() {
  return (
    <Fragment>
      <Head>
        <title key="title">About | Yusril Muttaqien</title>
      </Head>
      <section className="min-h-full-total-navbar">
        <div className="space-y-[1.125rem]">
          <SectionBox title="About" className={SECTION_BOX_STYLES}>
            <div className="space-y-[0.5lh]">
              <p className="lg:max-w-[30rem]">lorem</p>
              <p className="lg:max-w-[30rem]">ipsum</p>
            </div>
          </SectionBox>
          <SectionBox title="Curriculum Vitae" className={SECTION_BOX_STYLES}>
            <p className="lg:max-w-[30rem]">lorem</p>
            <p className="lg:max-w-[30rem]">ipsum</p>
          </SectionBox>
          <SectionBox title="Playlist" className={SECTION_BOX_STYLES}>
            <p className="lg:max-w-[30rem]">lorem</p>
            <p className="lg:max-w-[30rem]">ipsum</p>
          </SectionBox>
        </div>
      </section>
    </Fragment>
  );
}
