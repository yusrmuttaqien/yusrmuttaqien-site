import SectionHeader from '@/app/components/section-header';
import MainProjectsTable from '@/app/fragments/main-projects/main-projects-table';
import classMerge from '@/app/utils/class-merge';

export default function MainProjects({ className }: { className?: string }) {
  return (
    <section
      className={classMerge(
        'mt-[clamp(9.3125rem,_0.0398rem_+_46.3636vw,_12.5rem)]',
        'lg:mt-[clamp(12.5rem,_6.6564rem_+_11.2108vw,_15.625rem)]',
        className
      )}
    >
      <div className="container space-y-[clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)]">
        <SectionHeader
          subtitle="Projects"
          title="Lorem ipsum dolor sit amet consectetur. A tempor bibendum a nunc sagittis congue."
        />
        <MainProjectsTable />
      </div>
    </section>
  );
}
