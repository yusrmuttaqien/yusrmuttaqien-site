import SectionHeader from '@/app/components/section-header';
import MainMasteriesArticle from '@/app/fragments/main-masteries/main-masteries-article';
import { masteryLists } from '@/app/languages/en/masteries';
import classMerge from '@/app/utils/class-merge';

export default function MainMasteries({ className }: { className?: string }) {
  return (
    <section
      className={classMerge('mt-[clamp(5.5625rem,_-0.0739rem_+_28.1818vw,_7.5rem)]', className)}
    >
      <div className="container space-y-[clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)]">
        <SectionHeader
          subtitle="Masteries"
          title="Lorem ipsum dolor sit amet consectetur. A tempor bibendum a nunc sagittis congue."
        />
        <div className="space-y-[clamp(1.5rem,_0.0455rem_+_7.2727vw,_2rem)]">
          {masteryLists.map((mastery) => (
            <MainMasteriesArticle {...mastery} key={mastery.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
