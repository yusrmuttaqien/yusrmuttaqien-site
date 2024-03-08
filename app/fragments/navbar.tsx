import NavbarClock from '@/app/fragments/navbar-clock';
import NavbarYusrMuttaqien from '@/app/fragments/navbar-yusr-muttaqien';
import classMerge from '@/app/utils/class-merge';

const locStyles = 'text-[clamp(0.7444rem,_0.0008rem_+_3.7178vw,_1rem)]';

export default function Navbar() {
  return (
    <nav
      className={classMerge(
        'fixed top-0 left-0 right-0 z-50 container box-border',
        'mix-blend-difference text-beige',
        'py-[clamp(0.3719rem,_-0.0008rem_+_1.8633vw,_0.5rem)]'
      )}
    >
      <div className="flex justify-between items-center ">
        <p className={locStyles}>Malang, Indonesia</p>
        <NavbarClock className={locStyles} />
      </div>
      <NavbarYusrMuttaqien />
    </nav>
  );
}
