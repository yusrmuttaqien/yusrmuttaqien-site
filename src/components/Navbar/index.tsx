import { Fragment, useRef } from 'react';
import mergeRefs from 'merge-refs';
import { tv } from 'tailwind-variants';
import useEntry from '@/components/Navbar/hooks/entry';
import useMeasure from '@/components/Navbar/hooks/measure';
import useContent from '@/components/Navbar/hooks/content';
import useInteractive from '@/components/Navbar/hooks/interactive';
import ClockStoreProvider from '@/components/Navbar/context';
import Host from '@/components/Navbar/host';
import Links from '@/components/Navbar/fragments/Links';
import Link from '@/components/Link';
import MenuToggle from '@/components/Navbar/fragments/MenuToggle';
import Menu from '@/components/Navbar/fragments/Menu';
import Clock from '@/components/Navbar/fragments/Clock';
import Availibility from '@/components/Navbar/fragments/Availibility';
import Language from '@/components/Navbar/fragments/Language';
import classMerge from '@/utils/classMerge';
import type { NavbarProps } from '@/components/Navbar/type';

export const classes = tv({
  slots: {
    navbar: classMerge(
      'sticky mix-blend-difference flex justify-between text-beige invisible',
      'hoverable:hover:mix-blend-normal after:absolute after:-inset-x-[1.125rem]',
      'after:-inset-y-[25%] after:bg-transparent after:pointer-events-none',
      'after:-z-[1] hoverable:hover:after:bg-dynamic-[beige_95] group/navbar',
      'hoverable:hover:text-dynamic-grey hoverable:hover:after:backdrop-blur-md'
    ),
    menu: '',
  },
});
export default function Navbar(props: NavbarProps) {
  const { className } = props;
  const scope = useRef<HTMLDivElement>(null);
  const { booking } = useContent();
  const { navbar, menu } = classes();
  const { scope: entryScope } = useEntry();
  const { scope: measureScope } = useMeasure();
  const { scope: interactiveScope } = useInteractive();

  return (
    <Fragment>
      <nav
        id="navbar"
        ref={mergeRefs(measureScope, interactiveScope, entryScope, scope)}
        className={navbar({ className: className?.navbar })}
      >
        <div
          className={classMerge(
            'flex flex-col gap-4 justify-between xl:flex-row',
            'xl:gap-[0] xl:items-center relative'
          )}
        >
          <p
            id="ym-title"
            className={classMerge(
              'trim-nohemi font-extrabold mr-[5ch] font-nohemi absolute top-1/2',
              '-translate-y-1/2 left-0'
            )}
          >
            Yusril Muttaqien
          </p>
          <p className="trim-helvetiva-neue" id="location">
            <span className="inline-block">Malang, Indonesia</span>
            <span className="mx-[1ch] hidden xl:inline-block">|</span>
          </p>
          <ClockStoreProvider>
            <Clock />
          </ClockStoreProvider>
        </div>
        <div
          className={classMerge(
            'flex flex-col gap-4 justify-between items-end xl:flex-row xl:gap-8',
            'xl:items-center'
          )}
        >
          <Links />
          <Link id="booking" href="https://calendly.com/idyusril">
            {booking}
          </Link>
          <Availibility
            className={{
              background: 'hidden xl:block group-hover/navbar:!bg-dynamic-green',
              text: 'group-hover/navbar:!text-beige',
            }}
          />
          <Language className="hidden xl:flex" />
          <MenuToggle className="xl:hidden" />
        </div>
      </nav>
      <Menu className={menu({ className: className?.menu })} />
      <Host scope={scope} />
    </Fragment>
  );
}
