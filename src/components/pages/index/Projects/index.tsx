import { motion } from 'framer-motion';
import Link from '@/components/Link';
import Trans from '@/components/Trans';
import useInteractive from '@/components/pages/index/Projects/hooks/interactive';
import useContent from '@/components/pages/index/Projects/hooks/content';
import Card from '@/components/pages/index/Projects/fragments/Card';
import classMerge from '@/utils/classMerge';
import type { TransComp } from '@/components/Trans/type';

const COMPS: TransComp = {
  P: (value, id) => (
    <span key={id} className="text-dynamic-green block font-extrabold">
      {value}
    </span>
  ),
  S: (value, id) => (
    <sup key={id} className="font-bold">
      {value}
    </sup>
  ),
};

export default function Projects() {
  const { projects, more, projectTitle } = useContent();
  const { scope, filterBlur, opacity } = useInteractive();

  return (
    <section ref={scope} className="relative isolate">
      <motion.h2
        style={{ filter: filterBlur, opacity }}
        className={classMerge(
          'trim-nohemi-height text-center text-clamp-[48_84_320_540] font-nohemi',
          'sticky top-[45svh] pointer-events-none z-0'
        )}
      >
        <Trans name="project-title" string={projectTitle} comps={COMPS} />
      </motion.h2>
      <div className="space-y-96 pt-[50svh] pb-96 z-10 relative">
        {projects.map((project) => (
          <Card {...project} key={project.alt} className="w-full max-w-[50rem] mx-auto" />
        ))}
        <Link
          className={{
            link: { a: 'mx-auto block w-max' },
            arrowLook: { text: 'text-clamp-[16_32_320_540]' },
          }}
          href="#"
          isDisabled
        >
          <Trans name="project-more" string={more} comps={COMPS} />
        </Link>
      </div>
    </section>
  );
}
