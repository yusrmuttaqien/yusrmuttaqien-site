import MainProjectsCardTags from '@/app/fragments/main-projects/card/main-projects-card-tags';
import classMerge from '@/app/utils/class-merge';

export default function MainProjectsCard() {
  return (
    <figure className="relative">
      <CardCover className="relative z-10" />
      <div className="absolute inset-1 bg-red-400"></div>
    </figure>
  );
}

function CardCover({ className }: { className?: string }) {
  return (
    <div
      className={classMerge(
        'space-y-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)]',
        'p-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)] isolate',
        'border-y-2 border-grey/60 dark:border-beige/60 overflow-hidden',
        'md:px-[clamp(1rem,_-0.0644rem_+_3.9604vw,_2rem)]',
        className
      )}
    >
      <header className="space-y-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)]">
        <div className="flex gap-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)]">
          <p className="font-roboto-mono text-[clamp(1.4881rem,_-0.001rem_+_7.4455vw,_2rem)] select-none">
            01
          </p>
          <div
            className={classMerge(
              'relative before:absolute before:-z-[10] before:-inset-[99rem] flex-1',
              'before:border-[99rem] before:dark:border-grey before:border-beige xl:w-28'
            )}
          />
        </div>
        <h3
          className="h3-normal after:table after:-mt-[.12em] truncate"
          title="Project One when there is way to much text wha gonna happen?"
        >
          Project One when there is way to much text wha gonna happen?
        </h3>
      </header>
      <MainProjectsCardTags />
    </div>
  );
}
