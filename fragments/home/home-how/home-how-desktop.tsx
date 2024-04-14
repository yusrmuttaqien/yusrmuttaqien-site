import HomeHowCard from '@/fragments/home/home-how/home-how-card';
import classMerge from '@/utils/class-merge';

const stepStyles = classMerge(
  'project-title-em opacity-20 uppercase hoverable:cursor-pointer',
  'hoverable:hover:opacity-60 transition-opacity w-max project-title-trim'
);

export default function HomeHowDesktop() {
  return (
    <article
      className={classMerge(
        'px-[calc(clamp(1.125rem,_0.0341rem_+_5.4545vw,_1.5rem)_*_6)] flex justify-between'
      )}
    >
      <HomeHowCard />
      <div className="space-y-16 text-[26px]">
        <p className={stepStyles}>Command.</p>
        <p className={stepStyles}>Options.</p>
        <p className={stepStyles}>Control.</p>
      </div>
    </article>
  );
}
