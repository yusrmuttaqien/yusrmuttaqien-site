import MainProjectsPaginator from '@/app/fragments/main-projects/main-projects-paginator';
import MainProjectsCard from '@/app/fragments/main-projects/card/main-projects-card';
import { getRootParams } from '@/app/utils/root-params';
import mainContents from '@/app/contents/main';
import type { i18nTypes } from '@/app/types/i18n';

export default async function MainProjectsTable() {
  const { params } = getRootParams();
  const { projectsPagination, projectLists } = await mainContents(params.lang as i18nTypes);

  return (
    <div className="space-y-[clamp(1.5rem,_0.0455rem_+_7.2727vw,_2rem)]">
      <MainProjectsPaginator t={projectsPagination} />
      <div className="space-y-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)] lg:space-y-[clamp(1.5rem,_2.435rem_+_-1.7937vw,_1rem)]">
        {projectLists.map((project, idx) => (
          <MainProjectsCard idx={idx + 1} key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}
