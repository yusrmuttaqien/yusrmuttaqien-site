import NavbarClock from '@/app/components/navbar-clock';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';
import classMerge from '@/app/utils/class-merge';

const locStyles = '~sm/md:~text-[0.7444rem]/base';

export default function Navbar() {
  return (
    <nav
      className={classMerge(
        'fixed top-0 left-0 right-0 flex flex-col items-center max-w-7xl mx-auto z-50',
        'mix-blend-difference text-beige',
        'gap-[clamp(0.465rem,_-0.0005rem_+_2.3273vw,_0.625rem)]',
        'py-[clamp(0.3719rem,_-0.0008rem_+_1.8633vw,_0.5rem)]',
        'px-[clamp(1.1162rem,_1.4542rem_+_-1.6902vw,_1rem)]'
      )}
    >
      <div className="flex justify-between self-stretch items-center">
        <p className={locStyles}>Malang, Indonesia</p>
        <NavbarClock className={locStyles} />
      </div>
      <YusrMuttaqien
        className={classMerge('lg:translate-center ', '~sm/md:~text-[0.9794rem]/[1.3162rem]')}
      />
    </nav>
  );
}
