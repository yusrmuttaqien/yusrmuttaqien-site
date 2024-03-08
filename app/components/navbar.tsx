import NavbarClock from '@/app/components/navbar-clock';
// import YusrMuttaqien from '@/app/components/yusr-muttaqien';
import classMerge from '@/app/utils/class-merge';

const locStyles = 'text-[clamp(0.7444rem,_0.0008rem_+_3.7178vw,_1rem)]';

export default function Navbar() {
  return (
    <nav
      className={classMerge(
        'fixed top-0 left-0 right-0 flex flex-col items-center z-50 container',
        'mix-blend-difference text-beige',
        'gap-[clamp(0.465rem,_-0.0005rem_+_2.3273vw,_0.625rem)]',
        'py-[clamp(0.3719rem,_-0.0008rem_+_1.8633vw,_0.5rem)]'
      )}
    >
      <div className="flex justify-between self-stretch items-center">
        <p className={locStyles}>Malang, Indonesia</p>
        <NavbarClock className={locStyles} />
      </div>
      {/* <YusrMuttaqien
        className={classMerge(
          'lg:translate-center ',
          'text-[clamp(0.9794rem,_-0.0004rem_+_4.8989vw,_1.3162rem)]'
        )}
      /> */}
    </nav>
  );
}
