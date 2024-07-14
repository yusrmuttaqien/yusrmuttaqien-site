import { useMotionValue } from 'framer-motion';
import { ListGroup, Title, Content } from '@/components/pages/projects/Lists/fragments/ListGroup';
import classMerge from '@/utils/classMerge';

export default function Lists() {
  const activeContent = useMotionValue('');

  return (
    <section className="pb-5 xl:pb-8">
      <h1 className="hidden">Projects lists</h1>
      <div className="flex flex-col gap-[2.625rem] xl:gap-clamp-[54_84_1280_1512]">
        <ListGroup count={3} title="Accessible">
          <Title />
          {Array.from({ length: 3 }).map((_, idx) => (
            <Content
              activeContent={activeContent}
              key={idx}
              className={classMerge(idx === 0 && 'mt-2')}
            />
          ))}
        </ListGroup>
        <ListGroup count={1} title="Ongoing">
          <Title />
          {Array.from({ length: 3 }).map((_, idx) => (
            <Content
              activeContent={activeContent}
              key={idx}
              className={classMerge(idx === 0 && 'mt-2')}
            />
          ))}
        </ListGroup>
        <ListGroup count={2} title="Upcoming">
          <Title />
          {Array.from({ length: 3 }).map((_, idx) => (
            <Content
              activeContent={activeContent}
              key={idx}
              className={classMerge(idx === 0 && 'mt-2')}
            />
          ))}
        </ListGroup>
      </div>
    </section>
  );
}
