import { Fragment } from 'react';
import mergeRefs from 'merge-refs';
import { tv } from 'tailwind-variants';
import useMeasure from '@/components/Navbar/hooks/measure';
import useContent from '@/components/Navbar/hooks/content';
import useInteractive from '@/components/Navbar/hooks/interactive';
import ClockStoreProvider from '@/components/Navbar/context';
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
      'sticky mix-blend-difference flex justify-between text-beige',
      'hoverable:hover:mix-blend-normal after:absolute after:-inset-x-[1.125rem]',
      'after:-inset-y-[25%] after:bg-transparent after:pointer-events-none',
      'after:-z-[1] hoverable:hover:after:bg-dynamic-[beige_80]',
      'hoverable:hover:text-dynamic-grey hoverable:hover:after:backdrop-blur-md'
    ),
    menu: '',
  },
});

export default function Navbar(props: NavbarProps) {
  const { className } = props;
  const { booking } = useContent();
  const { navbar, menu } = classes();
  const { scope: measureScope } = useMeasure();
  const { scope: interactiveScope } = useInteractive();

  return (
    <Fragment>
      <nav
        id="navbar"
        ref={mergeRefs(measureScope, interactiveScope)}
        className={navbar({ className: className?.navbar })}
      >
        <div className="flex flex-col gap-2 justify-between xl:flex-row xl:gap-[0] xl:items-center">
          <p className="trim-helvetiva-neue">
            Malang, Indonesia<span className="mx-[1ch] hidden xl:inline">|</span>
          </p>
          <ClockStoreProvider>
            <Clock />
          </ClockStoreProvider>
        </div>
        <div className="flex flex-col gap-2 justify-between items-end xl:flex-row xl:gap-8 xl:items-center">
          <Link href="https://calendly.com/idyusril">{booking}</Link>
          <Availibility className="hidden xl:block" />
          <Language className="hidden xl:flex" />
          <MenuToggle className="xl:hidden" />
        </div>
      </nav>
      <Menu className={menu({ className: className?.menu })} />
    </Fragment>
  );
}
