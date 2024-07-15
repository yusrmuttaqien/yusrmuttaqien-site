import mergeRefs from 'merge-refs';
import { motion } from 'framer-motion';
import Link from '@/components/Link';
import Trans from '@/components/Trans';
import useEntry from '@/components/pages/index/Projects/hooks/entry';
import useInteractive from '@/components/pages/index/Projects/hooks/interactive';
import useContent from '@/components/pages/index/Projects/hooks/content';
import DisplayCard from '@/components/DisplayCard';
import classMerge from '@/utils/classMerge';
import type { TransComp } from '@/components/Trans/type';

const COMPS: TransComp = {
  P: (value, id) => (
    <span key={id} id={id} className="text-dynamic-green block font-extrabold">
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
  const { scope: interactiveScope, filterBlur, opacity } = useInteractive();
  const { scope: entryScope } = useEntry();

  return (
    <section ref={mergeRefs(interactiveScope, entryScope)} className="relative isolate invisible">
      <motion.h2
        style={{ filter: filterBlur, opacity }}
        className={classMerge(
          'trim-nohemi-height text-center text-clamp-[48_84_320_540] font-nohemi',
          'sticky top-half-minimal-navbar pointer-events-none z-0'
        )}
      >
        <Trans
          name="project-title"
          string={projectTitle}
          comps={COMPS}
          classNames={{ 'project-title-0': 'block' }}
        />
      </motion.h2>
      <div className="space-y-96 pt-[50svh] pb-96 z-10 relative">
        {projects.map((project) => (
          <DisplayCard
            project={project}
            id="project-card"
            key={project.alt}
            className="w-full max-w-[50rem] mx-auto"
            image={{ placeholder: 'blur' }}
          />
        ))}
        <Link
          className={{
            a: 'mx-auto block w-max',
            arrowLook: { text: 'text-clamp-[16_32_320_540]' },
          }}
          href="#"
          isDisabled
          id="project-more"
        >
          <Trans name="project-more" string={more} comps={COMPS} />
        </Link>
      </div>
    </section>
  );
}
