import { useRef } from 'react';
import mergeRefs from 'merge-refs';
import useNavbarMeasure from '@/hooks/navbar/navbar-measure';
import useNavbarEntry from '@/hooks/navbar/navbar-entry';
import NavbarClock from '@/fragments/navbar/navbar-clock';
import NavbarYusrMuttaqien from '@/fragments/navbar/navbar-yusr-muttaqien';
import NavbarLang from '@/fragments/navbar/navbar-lang';
import classMerge from '@/utils/class-merge';

export default function Navbar() {
  const measureScope = useRef<HTMLDivElement>();
  const { scope: entryScope } = useNavbarEntry();

  useNavbarMeasure({ root: measureScope });

  return (
    <nav
      ref={mergeRefs(measureScope, entryScope)}
      className={classMerge(
        'fixed top-0 left-0 right-0 z-[100] container box-border',
        'mix-blend-difference text-beige invisible',
        'py-[clamp(0.3719rem,_-0.0008rem_+_1.8633vw,_0.5rem)]'
      )}
    >
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center gap-[1ch]">
          <p data-framer="location">Malang, Indonesia</p>
          <span data-framer="separator">|</span>
          <NavbarLang />
        </div>
        <NavbarClock />
      </div>
      <NavbarYusrMuttaqien />
    </nav>
  );
}
