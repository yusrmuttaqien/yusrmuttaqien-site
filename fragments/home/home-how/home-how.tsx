import HomeHowHeader from '@/fragments/home/home-how/home-how-header';
import HomeHowDesktop from '@/fragments/home/home-how/home-how-desktop';
import classMerge from '@/utils/class-merge';

export default function HomeHow({ className }: { className?: string }) {
  return (
    <section
      className={classMerge(
        'space-y-[calc(clamp(4.25rem,_1.25rem_+_15vw,_5.75rem)_*_2)]',
        className
      )}
    >
      <div className="container">
        <HomeHowHeader />
      </div>
      <HomeHowDesktop />
    </section>
  );
}
