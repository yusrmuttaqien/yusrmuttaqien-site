import { Fragment } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/pages/index/Hero';
import Projects from '@/components/pages/index/Projects';
import classMerge from '@/utils/classMerge';

const COD = dynamic(() => import('../components/pages/index/COD'), {
  loading: () => (
    <p className={classMerge('text-dynamic-[grey_60] font-bold trim-helvetiva-neue mb-96')}>
      Loading scene
    </p>
  ),
});

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <Projects className={{ lists: 'pb-48' }} />
      <COD className="mb-96" />
    </Fragment>
  );
}
