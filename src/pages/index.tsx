import { Fragment } from 'react';
import Hero from '@/components/pages/index/Hero';
import Projects from '@/components/pages/index/Projects';

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <Projects />
    </Fragment>
  );
}
