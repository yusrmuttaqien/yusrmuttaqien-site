import { useMotionValue } from 'framer-motion';
import useProjects from '@/hooks/projects';
import { ListGroup, Title, Content } from '@/components/pages/projects/Lists/fragments/ListGroup';
import classMerge from '@/utils/classMerge';

export default function Lists() {
  const { projects, count } = useProjects();
  const activeContent = useMotionValue('');

  return (
    <section className="pb-5 xl:pb-8">
      <h1 className="hidden">Projects lists</h1>
      <div className="flex flex-col gap-[2.625rem] xl:gap-clamp-[54_84_1280_1512]">
        <ListGroup count={count.accessible} title="Accessible">
          <Title />
          {projects.accessible.map((project, idx) => (
            <Content
              key={idx}
              project={project}
              activeContent={activeContent}
              className={classMerge(idx === 0 && 'mt-2')}
            />
          ))}
        </ListGroup>
        <ListGroup count={count.ongoing} title="Ongoing">
          <Title />
          {projects.ongoing.map((project, idx) => (
            <Content
              key={idx}
              project={project}
              activeContent={activeContent}
              className={classMerge(idx === 0 && 'mt-2')}
            />
          ))}
        </ListGroup>
        <ListGroup count={count.upcoming} title="Upcoming">
          <Title />
          {projects.upcoming.map((project, idx) => (
            <Content
              key={idx}
              project={project}
              activeContent={activeContent}
              className={classMerge(idx === 0 && 'mt-2')}
            />
          ))}
        </ListGroup>
      </div>
    </section>
  );
}
