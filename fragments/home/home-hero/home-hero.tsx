import mergeRefs from 'merge-refs';
import useHomeHeroEntry from '@/hooks/home/home-hero/home-hero-entry';
import useHomeHeroInteractive from '@/hooks/home/home-hero/home-hero-interactive';
import Blueprint from '@/components/blueprint';
import HomeHeroYusrMuttaqien from '@/fragments/home/home-hero/home-hero-yusr-muttaqien';
import classMerge from '@/utils/class-merge';
import useContent from '@/contents/home';

export default function HomeHero({ className }: { className?: string }) {
  const {
    hero: { tagline },
  } = useContent();
  const { scope: entryScope, isComplete } = useHomeHeroEntry();
  const interactionScope = useHomeHeroInteractive(isComplete);

  return (
    // NOTE: Using opacity-0 instead invisible to fix Safari missing inner centre
    <section
      ref={mergeRefs(entryScope, interactionScope)}
      id="home-hero"
      className={classMerge(
        'h-[100svh] min-h-[25rem] w-full flex items-end relative isolate',
        'bg-beige dark:bg-grey overflow-hidden opacity-0',
        className
      )}
    >
      <header
        data-framer="hero-header"
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
