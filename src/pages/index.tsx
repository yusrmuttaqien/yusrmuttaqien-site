import { Fragment } from 'react';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <Projects />
    </Fragment>
  );
}
