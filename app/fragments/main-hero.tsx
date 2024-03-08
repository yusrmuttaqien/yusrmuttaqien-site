import YusrMuttaqien from '@/app/components/yusr-muttaqien';
import Blueprint from '@/app/components/blueprint';
import classMerge from '@/app/utils/class-merge';
import { renderOnEnum } from '@/app/constants/yusr-muttaqien';

export default function MainHero() {
  return (
    <section className="h-[100dvh] min-h-[25rem] w-full flex items-end relative">
      <header
        className={classMerge(
          'z-10 w-full',
          'p-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]',
          'bg-beige/80 backdrop-blur-8 dark:bg-grey/80'
        )}
      >
        <p className="body-subheading">Frontend developer | UIUX | Graphics</p>
        <YusrMuttaqien renderOn={renderOnEnum.SEQUENCE_END} />
      </header>
      <Blueprint className="absolute top-0 left-0" />
    </section>
  );
}
