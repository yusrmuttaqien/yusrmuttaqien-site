import { Fragment } from 'react';
import Arrow from '@/svg/Arrow';
import classMerge from '@/utils/classMerge';
import type { ListGroupProps } from '@/components/pages/projects/Lists/fragments/ListGroup/type';

export function ListGroup(props: ListGroupProps) {
  const { count, title, children, className } = props;

  return (
    <div>
      <div
        className={classMerge(
          'flex flex-col justify-between font-nohemi text-clamp-[42_54_320_430] mt-10 py-[.1em]',
          'gap-4 overflow-hidden lg-540:flex-row xl:mt-0 xl:text-clamp-[54_84_1280_1512]'
        )}
      >
        <p className="trim-nohemi-height font-extralight">{count}</p>
        <h2 className="trim-nohemi-height">{title}</h2>
      </div>
      <div
        className={classMerge(
          'grid text-lg grid-cols-[[start]_1.5fr_1.2fr_[end]_fit-content(100%)]',
          'lg:grid-cols-[[start]_1.5fr_1.2fr_1fr_[end]_fit-content(100%)]',
          'lg-970:grid-cols-[[start]_1.5fr_1.2fr_1fr_1fr_[end]_fit-content(100%)]',
          'xl:grid-cols-[fit-content(100%)_[start]_1.5fr_1.2fr_1fr_1fr_[end]_fit-content(100%)]',
          className
        )}
      >
        {count ? (
          children
        ) : (
          <p
            className={classMerge(
              'text-dynamic-[grey_60] font-bold trim-helvetiva-neue mx-auto my-6 col-span-full'
            )}
          >
            No projects
          </p>
        )}
      </div>
    </div>
  );
}
export function Title() {
  return (
    <Fragment>
      <div
        className={classMerge(
          'grid grid-cols-subgrid mt-6 col-span-full text-dynamic-[grey_60] font-bold py-2 px-1',
          'gap-3 items-center'
        )}
      >
        <p className="trim-helvetiva-neue invisible xl-only:hidden">00</p>
        <p className="trim-helvetiva-neue">Project</p>
        <p className="trim-helvetiva-neue lg-only:hidden">Industry</p>
        <p className="trim-helvetiva-neue lg-970-only:hidden">Client</p>
        <p className="trim-helvetiva-neue text-right">Year</p>
        <Arrow className="invisible w-[.8lh] h-[.8lh] rotate-[135deg] lg-970:hidden" />
      </div>
    </Fragment>
  );
}
