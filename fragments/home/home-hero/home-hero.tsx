import { useRef } from 'react';
import mergeRefs from 'merge-refs';
import { motion } from 'framer-motion';
import useHomeHeroEntry from '@/hooks/home/home-hero/home-hero-entry';
import useHomeHeroInteractive from '@/hooks/home/home-hero/home-hero-interactive';
import HomeHeroYusrMuttaqien from '@/fragments/home/home-hero/home-hero-yusr-muttaqien';
import HomeHeroBlueprint from '@/fragments/home/home-hero/home-hero-blueprint';
import classMerge from '@/utils/class-merge';
import useContent from '@/contents/home';

export default function HomeHero({ className }: { className?: string }) {
  const {
    hero: { tagline },
  } = useContent();
  const scope = useRef<HTMLDivElement>(null);
  const { scope: entryScope, status } = useHomeHeroEntry();
  const { scope: interactionScope, bpUnits, headerUnits } = useHomeHeroInteractive(status);

  return (
    // NOTE: Using opacity-0 instead invisible to fix Safari missing inner centre
    <section
      ref={mergeRefs(entryScope, interactionScope, scope)}
      id="home-hero"
      className={classMerge(
        'h-[100svh] min-h-[25rem] w-full flex items-end relative isolate',
        'bg-beige dark:bg-grey overflow-hidden opacity-0',
        className
      )}
    >
      <motion.header
        data-framer="hero-header"
        style={status === 'complete' ? headerUnits : {}}
        className={classMerge(
          'z-10 w-full relative p-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]',
          'bg-beige/80 backdrop-blur-8 dark:bg-grey/80'
        )}
      >
        <p className="body-subheading lg:-mb-[1.6vw]">{tagline}</p>
        <HomeHeroYusrMuttaqien root={scope} />
      </motion.header>
      <HomeHeroBlueprint
        className="absolute top-0 left-0 pointer-events-none"
        framerStyles={bpUnits}
      />
    </section>
  );
}
