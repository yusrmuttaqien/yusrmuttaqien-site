import SectionHeader from '@/app/components/section-header';
import MainProjectsTable from '@/app/fragments/main-projects/main-projects-table';
import classMerge from '@/app/utils/class-merge';
import { getRootParams } from '@/app/utils/root-params';
import mainContents from '@/app/contents/main';
import { ANCHOR_PROJECTS } from '@/app/constants/anchor';
import type { i18nTypes } from '@/app/types/i18n';

export default async function MainProjects({ className }: { className?: string }) {
  const { params } = getRootParams();
  const { projectsHeader } = await mainContents(params.lang as i18nTypes);

  return (
    <section
      id={ANCHOR_PROJECTS.replace('#', '')}
      className={classMerge(
        'mt-[clamp(9.3125rem,_0.0398rem_+_46.3636vw,_12.5rem)]',
        'lg:mt-[clamp(12.5rem,_6.6564rem_+_11.2108vw,_15.625rem)]',
        'scroll-mt-[calc(var(--navbar-total-height)_*_1px)]',
        className
      )}
    >
      <div className="container space-y-[clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)]">
        <SectionHeader subtitle={projectsHeader.subtitle} title={projectsHeader.title} />
        <MainProjectsTable />
      </div>
    </section>
  );
}
