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
        'space-y-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)]',
        'p-[clamp(0.7444rem,_0.0007rem_+_3.7182vw,_1rem)] isolate',
        'border-y-2 border-grey/60 dark:border-beige/60 overflow-hidden'
      )}
    >
      <header className={classMerge('flex flex-col justify-center', gapStyle)}>
        <div className={classMerge('flex justify-center', gapStyle)}>
          <p className="font-roboto-mono text-[clamp(1.4881rem,_-0.001rem_+_7.4455vw,_2rem)]">01</p>
          <div
            className={classMerge(
              'flex-1 relative before:absolute before:-z-[10]',
              'before:border-[99rem] before:dark:border-grey before:border-beige before:-inset-[99rem] '
            )}
          />
        </div>
        <h3 className="h3-normal">Project One</h3>
      </header>
      <div>badge categories</div>
    </div>
  );
}
