import MainProjectsPaginator from '@/app/fragments/main-projects/main-projects-paginator';
import MainProjectsCard from '@/app/fragments/main-projects/card/main-projects-card';
import { projectLists } from '@/app/languages/en/projects';

export default function MainProjectsTable() {
  return (
    <div className="space-y-[clamp(1.5rem,_0.0455rem_+_7.2727vw,_2rem)]">
      <MainProjectsPaginator />
      <div className="space-y-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)] lg:space-y-[clamp(1.5rem,_2.435rem_+_-1.7937vw,_1rem)]">
        {projectLists.map((project, idx) => (
          <MainProjectsCard idx={idx + 1} key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}
