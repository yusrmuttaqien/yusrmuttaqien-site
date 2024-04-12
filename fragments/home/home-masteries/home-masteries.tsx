import { tv } from 'tailwind-variants';
import mergeRefs from 'merge-refs';
import useHomeMasteriesEntry from '@/hooks/home/home-masteries/home-masteries-entry';
import useHomeMasteriesCalculate from '@/hooks/home/home-masteries/home-masteries-calculate';
import { useMediaQueryCtx } from '@/providers/media-query';
import SectionHeader from '@/components/section-header';
import HomeMasteriesList from '@/fragments/home/home-masteries/home-masteries-list';
import HomeMasteriesMarquee from '@/fragments/home/home-masteries/home-masteries-marquee';
import classMerge from '@/utils/class-merge';
import useContent from '@/contents/home';

const styles = tv({
  slots: {
    container: 'relative invisible isolate',
    wrapper: 'container space-y-[clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)] relative z-10',
    marquee: 'w-[var(--height)] text-grey dark:text-beige',
  },
});

export default function HomeMasteries({ className }: { className?: Partial<typeof styles.slots> }) {
  const {
    masteries: { title, subtitle, masteries },
  } = useContent();
  const { isDeviceMobile } = useMediaQueryCtx();
  const entryScope = useHomeMasteriesEntry();
  const calculateScope = useHomeMasteriesCalculate();
  const { container, wrapper, marquee } = styles();

  return (
    <section
      ref={mergeRefs(entryScope, calculateScope)}
      id="home-masteries"
      className={container({ className: className?.container })}
    >
      <div className={wrapper({ className: className?.wrapper })}>
        <SectionHeader subtitle={subtitle} title={title} />
        <div
          data-framer="masteries-lists"
          className="space-y-[clamp(1.5rem,_0.0455rem_+_7.2727vw,_2rem)]"
        >
          {masteries.map((mastery, idx) => (
            <HomeMasteriesList {...mastery} key={mastery.title} idx={idx} />
          ))}
        </div>
      </div>
      {!isDeviceMobile && (
        <div
          className={classMerge(
            'absolute -top-[var(--margin-top)] pointer-events-none -translate-y-full',
            'translate-x-[var(--margin-block)] rotate-90 origin-bottom-left isolate',
            'before:inset-0 before:bg-gradient-to-r before:from-beige dark:before:from-grey before:block',
            'before:absolute before:z-10 before:w-[10%] after:inset-0 after:bg-gradient-to-l dark:after:from-grey',
            'after:from-beige after:block after:absolute after:z-10 after:w-[10%] after:left-[unset]',
            'md-only:top-[unset] md-only:translate-x-[var(--width)]',
            'md-only:-rotate-90 overflow-hidden'
          )}
        >
          {/* NOTE: Using opacity instead text-color/opacity to fix Safari opaque emoticon */}
          <HomeMasteriesMarquee
            className={{ container: marquee(), wrapper: 'opacity-5' }}
            baseVelocity={100}
            name="positive"
          >
            <p className="project-title">The devil in the details. 😈</p>
          </HomeMasteriesMarquee>
          <HomeMasteriesMarquee
            className={{ container: marquee(), wrapper: 'opacity-5' }}
            baseVelocity={-100}
            name="negative"
          >
            <p className="project-title">The devil in the details. 😈</p>
          </HomeMasteriesMarquee>
        </div>
      )}
    </section>
  );
}
