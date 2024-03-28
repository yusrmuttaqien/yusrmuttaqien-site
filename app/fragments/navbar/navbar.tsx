import NavbarClock from '@/app/fragments/navbar/navbar-clock';
import NavbarYusrMuttaqien from '@/app/fragments/navbar/navbar-yusr-muttaqien';
import NavbarMeasurement from '@/app/fragments/navbar/navbar-measurement';
import NavbarLang from '@/app/fragments/navbar/navbar-lang';
import { ID_NAVBAR } from '@/app/constants/navbar';
import classMerge from '@/app/utils/class-merge';

const locStyles = 'text-[clamp(0.7444rem,_0.0008rem_+_3.7178vw,_1rem)]';

export default function Navbar() {
  return (
    <nav
      id={ID_NAVBAR}
      className={classMerge(
        'fixed top-0 left-0 right-0 z-[100] container box-border',
        'mix-blend-difference text-beige',
        'py-[clamp(0.3719rem,_-0.0008rem_+_1.8633vw,_0.5rem)]'
      )}
    >
      <div className="flex justify-between items-center ">
        <div className="flex justify-between items-center gap-[1ch]">
          <p className={locStyles}>Malang, Indonesia</p>
          <span className={locStyles}>|</span>
          <NavbarLang className={locStyles} />
        </div>
        <NavbarClock className={locStyles} />
      </div>
      <NavbarYusrMuttaqien />
      <NavbarMeasurement />
    </nav>
  );
}
