import { useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import { useMediaQueryCtx } from '@/providers/media-query';
import HomeProjectsCOC from '@/fragments/home/home-projects/home-projects-coc';
import InjectString from '@/utils/inject-string';
import classMerge from '@/utils/class-merge';
import useContent from '@/contents/home';
import { PROJECTS_HEADER_TITLE_TRIM_STYLES } from '@/constants/home';

const COMPS = {
  coc: (
    <HomeProjectsCOC
      className={{
        container: classMerge(
          'absolute -top-2/4 w-[var(--coc-width)] rotate-12 origin-left',
          'left-[3.2ch] from-550:top-1/2 from-550:-translate-y-1/2',
          'from-550:origin-center from-550:left-[2.5ch]',
          'from-550:-rotate-12 z-10'
        ),
        path: 'fill-grey dark:fill-beige',
        stroke: 'fill-beige-off dark:fill-grey-off',
      }}
    />
  ),
};

export default function HomeProjectsHeader() {
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const {
    projects: { title, subtitle },
  } = useContent();
  const { isScreenFrom550 } = useMediaQueryCtx();

  useIsomorphicLayoutEffect(() => {
    h2Ref.current?.setAttribute(
      'style',
      isScreenFrom550
        ? '--coc-width: clamp(9.375rem, 1.1939rem + 15.6951vw, 13.75rem)'
        : '--coc-width: clamp(11.25rem, -0.9239rem + 60.8696vw, 20rem)'
    );
  }, [isScreenFrom550]);

  return (
    <header
      className={classMerge(
        'flex items-stretch justify-between flex-col from-550:items-center',
        'gap-[clamp(0.75rem,_0.0227rem_+_3.6364vw,_1rem)] xl:flex-row',
        'lg:gap-[clamp(1rem,_-0.87rem_+_3.5874vw,_2rem)]'
      )}
    >
      <div className="relative shrink-0">
        <h2
          ref={h2Ref}
          data-framer="projects-header-title"
          className={classMerge(
            'project-title uppercase isolate',
            PROJECTS_HEADER_TITLE_TRIM_STYLES
          )}
        >
          <InjectString
            comps={COMPS}
            string={title}
            name="projects-header-title"
            classNames={{
              'projects-header-title-0': 'block from-550:inline',
              'projects-header-title-2': 'from-550:ml-[calc(var(--coc-width)_-_1.2ch)]',
            }}
          />
        </h2>
      </div>
      <p
        data-framer="projects-header-subtitle"
        className={classMerge(
          'from-550:text-center lg:text-right',
          'xl:w-[clamp(24.4375rem,_25.1387rem_+_-1.3453vw,_24.0625rem)]'
        )}
      >
        {subtitle}
      </p>
    </header>
  );
}