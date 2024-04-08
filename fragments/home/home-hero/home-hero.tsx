import mergeRefs from 'merge-refs';
import useHomeHeroEntry from '@/hooks/hero/home-hero-entry';
import useHomeHeroInteraction from '@/hooks/hero/home-hero-interaction';
import Blueprint from '@/components/blueprint';
import HomeHeroYusrMuttaqien from '@/fragments/home/home-hero/home-hero-yusr-muttaqien';
import classMerge from '@/utils/class-merge';
import useContent from '@/contents/home';

export default function HomeHero({ className }: { className?: string }) {
  const {
    hero: { tagline },
  } = useContent();
  const { scope: entryScope, isComplete } = useHomeHeroEntry();
  const blueprintScope = useHomeHeroInteraction(isComplete);

  return (
    <section
      ref={mergeRefs(entryScope, blueprintScope)}
      id="home-hero"
      className={classMerge(
        'h-[100svh] min-h-[25rem] w-full flex items-end relative isolate',
        'bg-beige dark:bg-grey overflow-hidden invisible',
        className
      )}
    >
      <header
        data-framer="home-hero-header"
        className={classMerge(
          'z-10 w-full relative p-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]',
          'bg-beige/80 backdrop-blur-8 dark:bg-grey/80'
        )}
      >
        <p className="body-subheading lg:-mb-[1.6vw]">{tagline}</p>
        <HomeHeroYusrMuttaqien />
      </header>
      <Blueprint className="absolute top-0 left-0 pointer-events-none" />
    </section>
  );
}
