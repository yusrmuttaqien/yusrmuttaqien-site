import useHomeProjectsEntry from '@/hooks/home/home-projects/home-projects-entry';
import HomeProjectsCard from '@/fragments/home/home-projects/home-projects-card';
import HomeProjectsHeader from '@/fragments/home/home-projects/home-projects-header';
import useContent from '@/contents/home';
import classMerge from '@/utils/class-merge';

export default function HomeProjects({ className }: { className?: string }) {
  const {
    projects: { projects },
  } = useContent();
  const scope = useHomeProjectsEntry();
  const isTwoMore = projects.length >= 2;

  return (
    <section
      ref={scope}
      id="home-projects"
      className={classMerge(
        'space-y-[clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)] invisible',
        className
      )}
    >
      <div className="container space-y-[clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)]">
        <HomeProjectsHeader />
      </div>
      <div
        className={classMerge(
          'px-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)] grid',
          'grid gap-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]',
          isTwoMore ? 'lg:grid-cols-2' : 'content-center'
        )}
      >
        {projects.map((project) => (
          <div
            className={classMerge(isTwoMore ? '' : 'lg:container', 'w-full mx-auto')}
            key={project.title}
            data-framer={`projects-projects`}
          >
            <HomeProjectsCard
              className={classMerge('w-full aspect-[3/2] lg-only:aspect-[9/10]')}
              content={project}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
