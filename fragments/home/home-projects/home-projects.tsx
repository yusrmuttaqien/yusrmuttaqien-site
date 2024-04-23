import { memo } from 'react';
import Link from '@/components/link';
import useHomeProjectsEntry from '@/hooks/home/home-projects/home-projects-entry';
import HomeProjectsCard from '@/fragments/home/home-projects/home-projects-card';
import HomeProjectsHeader from '@/fragments/home/home-projects/home-projects-header';
import useContent from '@/contents/home';
import classMerge from '@/utils/class-merge';
import type { CSSProperties } from 'react';

const MemoizedProjectsHeader = memo(HomeProjectsHeader);

export default function HomeProjects({ className }: { className?: string }) {
  const {
    projects: { projects },
  } = useContent();
  const scope = useHomeProjectsEntry();
  const isTwoMore = projects.length >= 2;
  const isMoreFour = projects.length > 4;

  return (
    <section
      ref={scope}
      id="home-projects"
      className={classMerge(
        'space-y-[clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)] invisible',
        className
      )}
      style={{ '--spacing': 'clamp(1.125rem, 0.0341rem + 5.4545vw, 1.5rem)' } as CSSProperties}
    >
      <div className="container space-y-[clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)]">
        <MemoizedProjectsHeader />
      </div>
      <div
        className={classMerge(
          'px-[var(--spacing)] grid gap-[var(--spacing)]',
          isTwoMore ? 'lg:grid-cols-2' : 'content-center'
        )}
      >
        {projects.slice(0, 4).map((project) => (
          <div
            className={classMerge(isTwoMore ? '' : 'lg:container', 'w-full mx-auto')}
            key={project.title}
            data-framer="projects-projects"
          >
            <HomeProjectsCard
              className={classMerge('w-full aspect-[3/2] lg-only:aspect-[9/10]')}
              content={project}
            />
          </div>
        ))}
      </div>
      {isMoreFour && (
        <div className={classMerge(isTwoMore ? '!m-[var(--spacing)]' : 'lg:container')}>
          <Link
            data-framer="projects-more"
            className="h3-normal relative hoverable:hover-underline float-right"
            href="/projects"
          >
            See all projects
            <sup className="font-roboto-mono text-grey-dynamic-[60]">+{projects.length - 4}</sup>
          </Link>
        </div>
      )}
    </section>
  );
}
