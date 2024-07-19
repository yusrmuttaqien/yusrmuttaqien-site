import { useMotionValue, useIsomorphicLayoutEffect } from 'framer-motion';
import useProjects from '@/hooks/projects';
import { ListGroup, Title } from '@/components/pages/projects/Lists/fragments/ListGroup';
import ListContent from '@/components/pages/projects/Lists/fragments/ListContent';
import Preview from '@/components/pages/projects/Lists/fragments/Preview';
import classMerge from '@/utils/classMerge';

export default function Lists() {
  const { projects, count } = useProjects();
  const activeContent = useMotionValue('');

  useIsomorphicLayoutEffect(() => {
    return () => {
      activeContent.clearListeners();
    };
  }, []);

  return (
    <section className="pb-5 xl:pb-8 relative isolate min-h-full-total-navbar flex flex-col justify-between">
      <h1 className="hidden">Projects lists</h1>
      <div className={classMerge('flex flex-col gap-[2.625rem] xl:gap-clamp-[54_84_1280_1512]')}>
        <ListGroup count={count.accessible} title="Accessible">
          <Title />
          {projects.accessible.map((project, idx) => (
            <ListContent
              key={idx}
              id="accessible"
              project={project}
              activeContent={activeContent}
              className={classMerge(idx === 0 && 'mt-2')}
            />
          ))}
        </ListGroup>
        <ListGroup count={count.ongoing} title="Ongoing">
          <Title />
          {projects.ongoing.map((project, idx) => (
            <ListContent
              key={idx}
              id="ongoing"
              project={project}
              activeContent={activeContent}
              className={classMerge(idx === 0 && 'mt-2')}
            />
          ))}
        </ListGroup>
        <ListGroup count={count.upcoming} title="Upcoming">
          <Title />
          {projects.upcoming.map((project, idx) => (
            <ListContent
              key={idx}
              id="upcoming"
              project={project}
              activeContent={activeContent}
              className={classMerge(idx === 0 && 'mt-2')}
            />
          ))}
        </ListGroup>
      </div>
      <Preview
        className="z-0 pointer-events-none mix-blend-difference grayscale opacity-20"
        activeContent={activeContent}
      />
    </section>
  );
}
