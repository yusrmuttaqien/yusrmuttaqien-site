import { useRef } from 'react';
import useMediaQuery from '@/hooks/media-query';
import useIsomorphicLayoutEffect from '@/hooks/isometric-effect';
import InjectString from '@/utils/inject-string';
import HomeProjectsCOC from '@/fragments/home/home-projects/home-projects-coc';
import classMerge from '@/utils/class-merge';
import useContent from '@/contents/home';
import { scrSize } from '@/constants/tailwind-config';

const COMPS = {
  coc: (
    <HomeProjectsCOC
      className={{
        container: classMerge(
          'absolute -top-2/4 w-[var(--coc-width)] rotate-12 origin-left',
          'left-[3.2ch] md-from-550:top-1/2 md-from-550:-translate-y-1/2',
          'md-from-550:origin-center md-from-550:left-[2.5ch]',
          'md-from-550:-rotate-12'
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
  const is550 = useMediaQuery(`screen and (max-width: ${scrSize('md-550', true)})`);

  useIsomorphicLayoutEffect(() => {
    h2Ref.current?.setAttribute(
      'style',
      is550
        ? '--coc-width: clamp(11.25rem, -0.9239rem + 60.8696vw, 20rem)'
        : '--coc-width: clamp(9.375rem, 1.1939rem + 15.6951vw, 13.75rem)'
    );
  }, [is550]);

  return (
    <header
      className={classMerge(
        'flex items-stretch justify-between flex-col md-from-550:items-center',
        'gap-[clamp(0.75rem,_0.0227rem_+_3.6364vw,_1rem)] xl:flex-row',
        'lg:gap-[clamp(1rem,_-0.87rem_+_3.5874vw,_2rem)]'
      )}
    >
      <h2
        ref={h2Ref}
        className={classMerge(
          'project-title relative shrink-0 uppercase',
          'before:table before:-mb-[0.05em] after:table after:-mt-[0.2em]'
        )}
      >
        <InjectString
          comps={COMPS}
          string={title}
          name="project-header"
          classNames={{
            'project-header-0': 'block md-from-550:inline',
            'project-header-2': 'md-from-550:ml-[calc(var(--coc-width)_-_1.2ch)]',
          }}
        />
      </h2>
      <p
        data-framer="projects-header-subtitle"
        className={classMerge(
          'md-from-550:text-center lg:text-right',
          'xl:w-[clamp(24.4375rem,_25.1387rem_+_-1.3453vw,_24.0625rem)]'
        )}
      >
        {subtitle}
      </p>
    </header>
  );
}
