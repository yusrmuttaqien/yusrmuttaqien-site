import { useRef } from 'react';
import { useRouter } from 'next/router';
import HomeHowHeader from '@/fragments/home/home-how/home-how-header';
import HomeHowDesktop from '@/fragments/home/home-how/home-how-desktop';
import classMerge from '@/utils/class-merge';

export default function HomeHow({ className }: { className?: string }) {
  const { locale } = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="home-how"
      ref={sectionRef}
      className={classMerge(
        'px-[clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)]',
        'space-y-[calc(clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)_*_2)]',
        className
      )}
    >
      <HomeHowHeader />
      <HomeHowDesktop root={sectionRef} key={locale} />
    </section>
  );
}
