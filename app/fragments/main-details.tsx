import SectionHeader from '@/app/components/section-header';
import classMerge from '@/app/utils/class-merge';

export default function MainDetails({ className }: { className?: string }) {
  return (
    <section
      className={classMerge('mt-[clamp(5.5625rem,_-0.0739rem_+_28.1818vw,_7.5rem)]', className)}
    >
      <div className="container flex flex-col gap-[clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)]">
        <SectionHeader
          subtitle="The Details"
          title="Lorem ipsum dolor sit amet consectetur. A tempor bibendum a nunc sagittis congue."
        />
        <div>
          <article></article>
        </div>
      </div>
    </section>
  );
}
