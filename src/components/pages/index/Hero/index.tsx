import mergeRefs from 'merge-refs';
import { motion } from 'framer-motion';
import useEntry from '@/components/pages/index/Hero/hooks/entry';
import useInteractive from '@/components/pages/index/Hero/hooks/interactive';
import Pattern from '@/components/pages/index/Hero/fragments/Pattern';
import Scroll from '@/components/pages/index/Hero/fragments/Scroll';
import Links from '@/components/pages/index/Hero/fragments/Links';
import Roles from '@/components/pages/index/Hero/fragments/Roles';
import classMerge from '@/utils/classMerge';

export default function Hero() {
  const {
    scope: interactiveScope,
    patternScope,
    rolesValue,
    highlightStyles,
    patternStyles,
    imgStyles,
    titleStyles,
    linksValue,
  } = useInteractive();
  const { scope: entryScope } = useEntry();

  return (
    <section
      ref={mergeRefs(entryScope, interactiveScope)}
      className={classMerge(
        'h-[calc(200svh_-_var(--navbar-docked-total-height))] flex items-end perspective-5000',
        'invisible'
      )}
    >
      <div
        className={classMerge(
          'h-full-total-navbar flex flex-col gap-[3.375rem]',
          'pb-5 xl:pb-8 min-h-[34.375rem] xl:gap-[7.5rem] sticky bottom-0 w-full origin-center'
        )}
      >
        <div className="flex flex-col flex-1 gap-5 perspective-5000">
          <div
            id="window"
            ref={patternScope}
            className={classMerge(
              'w-full flex-1 min-h-0 relative overflow-hidden origin-bottom perspective-5000'
            )}
          >
            <Pattern
              className="w-full h-full"
              style={patternStyles}
              highlight={{ style: highlightStyles }}
            />
            <motion.img
              className={classMerge(
                'absolute bottom-0 right-0 h-[120%] max-w-full object-contain object-bottom',
                'pointer-events-none'
              )}
              style={imgStyles}
              id="ym-image"
              src="/yusr.png"
              alt="Yusril Muttaqien"
              draggable="false"
              loading="eager"
            />
          </div>
          <div className="flex flex-col gap-6 perspective-5000 xl:flex-row xl:items-center">
            <motion.h1
              id="hero-ym-title"
              style={titleStyles}
              className={classMerge(
                'font-nohemi trim-nohemi-height font-extrabold text-clamp-[48_84_320_540]',
                'w-min xl:w-auto'
              )}
            >
              Yusril Muttaqien
            </motion.h1>
            <Roles rootMotionValue={rolesValue} />
          </div>
        </div>
        <div
          className={classMerge(
            'flex flex-col gap-6 items-center justify-between lg-850:flex-row ',
            'lg-850:items-end lg-850:gap-10 perspective-5000'
          )}
        >
          <Links className="hidden lg-850:block" rootMotionValue={linksValue} />
          <Scroll className="shrink-0" />
        </div>
      </div>
    </section>
  );
}
