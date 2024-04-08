import useHomeMasteriesEntry from '@/hooks/hero/home-masteries-entry';
import SectionHeader from '@/components/section-header';
import HomeMasteriesList from '@/fragments/home/home-masteries/home-masteries-list';
import classMerge from '@/utils/class-merge';
import useContent from '@/contents/home';

export default function HomeMasteries({ className }: { className?: string }) {
  const {
    masteries: { title, subtitle, masteries },
  } = useContent();
  const scope = useHomeMasteriesEntry();

  return (
    <section
      ref={scope}
      id="home-masteries"
      className={classMerge(
        'scroll-mt-[calc(var(--navbar-total-height)_+_10)] invisible',
        'container space-y-[clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)]',
        className
      )}
    >
      <SectionHeader subtitle={subtitle} title={title} />
      <div
        data-framer="home-masteries-lists"
        className="space-y-[clamp(1.5rem,_0.0455rem_+_7.2727vw,_2rem)]"
      >
        {masteries.map((mastery, idx) => (
          <HomeMasteriesList {...mastery} key={mastery.title} idx={idx} />
        ))}
      </div>
    </section>
  );
}
