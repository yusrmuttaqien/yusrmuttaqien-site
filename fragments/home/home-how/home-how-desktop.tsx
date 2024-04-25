import { memo } from 'react';
import useHomeHowDesktopInteractive from '@/hooks/home/home-how/home-how-desktop-interactive';
import HomeHowDesktopCard from '@/fragments/home/home-how/home-how-desktop-card';
import classMerge from '@/utils/class-merge';
import type { HowDesktopProps } from '@/types/home';

const MemoizedSteps = memo(Steps);
const stepStyles = classMerge(
  'project-title-em opacity-20 uppercase hoverable:cursor-pointer',
  'hoverable:hover:opacity-60 transition-opacity w-max project-title-trim',
  'block'
);

export default function HomeHowDesktop(props: HowDesktopProps) {
  const { root } = props;
  const { scope, active, control } = useHomeHowDesktopInteractive({ root });

  return (
    <article
      ref={scope}
      className="flex gap-[7.5rem] 2xl:gap-[7.9vw] justify-center items-center h-min"
    >
      <HomeHowDesktopCard className="w-[31.25rem]" active={active} control={control} />
      <MemoizedSteps />
    </article>
  );
}

function Steps() {
  return (
    <div
      data-framer="how-desktop-steps"
      className="space-y-8 text-[clamp(0.75rem,_-1.319rem_+_2.5862vw,_1.125rem)] 2xl:text-[1.19vw]"
    >
      <button className={stepStyles}>Command.</button>
      <button className={stepStyles}>Options.</button>
      <button className={stepStyles}>Control.</button>
    </div>
  );
}
