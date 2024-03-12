import Tag from '@/app/components/tag';
import MainProjectsCardTags from '@/app/fragments/main-projects/card/main-projects-card-tags';
import classMerge from '@/app/utils/class-merge';

const gapStyle = 'gap-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)]';

export default function MainProjectsCard() {
  return (
    <figure className="bg-green">
      <CardCover />
    </figure>
  );
}

function CardCover() {
  return (
    <div
      className={classMerge(
        'flex flex-col xl:flex-row xl:items-center xl:justify-between',
        'gap-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)]',
        'p-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)] isolate',
        'border-y-2 border-grey/60 dark:border-beige/60 overflow-hidden',
        'md:px-[clamp(1rem,_-0.0644rem_+_3.9604vw,_2rem)]'
      )}
    >
      <header
        className={classMerge(
          'flex flex-col lg-only:justify-center lg:items-center lg:flex-row min-w-0',
          gapStyle
        )}
      >
        <div className={classMerge('flex justify-center lg-only:flex-1', gapStyle)}>
          <p className="font-roboto-mono text-[clamp(1.4881rem,_-0.001rem_+_7.4455vw,_2rem)] select-none">
            01
          </p>
          <div
            className={classMerge(
              'relative before:absolute before:-z-[10] before:-inset-[99rem] lg-only:flex-1',
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
