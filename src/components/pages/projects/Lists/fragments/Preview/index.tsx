import { useState } from 'react';
import Image from '@/components/Image';
import { useIsomorphicLayoutEffect, AnimatePresence, motion } from 'framer-motion';
import { useMediaQueryStore } from '@/contexts/mediaQueries';
import useProjects from '@/hooks/projects';
import classMerge from '@/utils/classMerge';
import type { Project } from '@/types/contents';
import type { PreviewProps } from '@/components/pages/projects/Lists/fragments/Preview/type';

export default function Preview(props: PreviewProps) {
  const { className, activeContent } = props;
  const { allProjects } = useProjects();
  const [activeProject, setActiveProject] = useState<Project | undefined>();
  const isLG970 = useMediaQueryStore((state) => state.isLG970);

  useIsomorphicLayoutEffect(() => {
    activeContent.on('change', (v: string) => {
      const project = allProjects.find((project) => v.includes(project.titleString));

      setActiveProject(project);
    });
  }, []);

  return (
    <div className={classMerge('sticky left-0 bottom-0 h-0', className)}>
      <AnimatePresence initial={false}>
        {activeProject && isLG970 && (
          <motion.div
            key={activeContent.get()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image
              scale={1}
              src={activeProject.src}
              alt={activeProject.alt}
              placeholder="blur"
              className={{
                container: classMerge('h-[80svh] max-w-full aspect-square absolute bottom-0'),
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
