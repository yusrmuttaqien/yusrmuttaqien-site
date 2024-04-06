import useHomeHeroAnimate from '@/hooks/hero/home-hero-animate';
import Blueprint from '@/components/blueprint';
import HomeHeroYusrMuttaqien from '@/fragments/home/home-hero/home-hero-yusr-muttaqien';
import classMerge from '@/utils/class-merge';

export default function HomeHero({ className }: { className?: string }) {
  const scope = useHomeHeroAnimate();

  return (
    <section
      ref={scope}
      className={classMerge(
        'h-[100svh] min-h-[25rem] w-full flex items-end relative isolate',
        'bg-beige dark:bg-grey invisible',
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
        <p className="body-subheading lg:-mb-[1.6vw]">Frontend developer | UIUX designer</p>
        <HomeHeroYusrMuttaqien />
      </header>
      <Blueprint className="absolute top-0 left-0 pointer-events-none" />
    </section>
  );
}
