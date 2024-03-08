import MainHeroYusrMuttaqien from '@/app/fragments/main-hero-yusr-muttaqien';
import Blueprint from '@/app/components/blueprint';
import classMerge from '@/app/utils/class-merge';

export default function MainHero() {
  return (
    <section className="h-[100dvh] min-h-[25rem] w-full flex items-end relative">
      <header
        className={classMerge(
          'z-10 w-full relative',
          'p-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]',
          'bg-beige/80 backdrop-blur-8 dark:bg-grey/80'
        )}
      >
        <p className="body-subheading lg:-mb-[1.5vw]">Frontend developer | UIUX | Graphics</p>
        <MainHeroYusrMuttaqien />
      </header>
      <Blueprint className="absolute top-0 left-0" />
    </section>
  );
}