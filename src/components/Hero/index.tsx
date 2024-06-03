import useEntry from '@/components/Hero/hooks/entry';
import useInteractive from '@/components/Hero/hooks/interactive';
import Pattern from '@/components/Hero/fragments/Pattern';
import Scroll from '@/components/Hero/fragments/Scroll';
import Links from '@/components/Hero/fragments/Links';
import Roles from '@/components/Hero/fragments/Roles';
import classMerge from '@/utils/classMerge';

export default function Hero() {
  const { scope: interactiveScope, xHighlight, yHighlight } = useInteractive();
  const { scope: entryScope } = useEntry();

  return (
    <section
      ref={entryScope}
      className={classMerge(
        'h-[calc(100svh_-_var(--navbar-docked-total-height))] flex flex-col gap-[3.375rem]',
        'pb-5 xl:pb-8 min-h-[34.375rem] xl:gap-[7.5rem]'
      )}
    >
      <div className="flex flex-col flex-1 gap-5 perspective-5000">
        <div
          ref={interactiveScope}
          className="w-full flex-1 min-h-0 relative overflow-hidden origin-bottom"
          id="window"
        >
          <Pattern
            className="w-full h-full"
            highlight={{ style: { x: xHighlight, y: yHighlight } }}
          />
          <img
            className={classMerge(
              'absolute bottom-0 right-0 h-[120%] max-w-full object-contain object-bottom',
              'pointer-events-none'
            )}
            id="ym-image"
            src="/yusr.png"
            alt="Yusril Muttaqien"
            draggable="false"
            loading="eager"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
          <h1
            id="hero-ym-title"
            className={classMerge(
              'font-nohemi trim-nohemi-height font-extrabold text-clamp-[48_84_320_540]',
              'w-min xl:w-auto'
            )}
          >
            Yusril Muttaqien
          </h1>
          <Roles />
        </div>
      </div>
      <div
        className={classMerge(
          'flex flex-col gap-6 items-center justify-between lg-850:flex-row ',
          'lg-850:items-end lg-850:gap-10'
        )}
      >
        <Links className="hidden lg-850:block" />
        <Scroll className="shrink-0" />
      </div>
    </section>
  );
}
