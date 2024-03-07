import NavbarClock from '@/app/components/navbar-clock';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';
import classMerge from '@/app/utils/class-merge';

const locStyles = '~sm/md:~text-[0.7444rem]/base';

export default function Navbar() {
  return (
    <nav
      className={classMerge(
        'sticky top-0 left-0 right-0 flex flex-col items-center max-w-7xl mx-auto',
        '~sm/md:~gap-[0.465rem]/[0.625rem]',
        '~sm/md:~py-[0.3719rem]/2',
        '~sm/md:~px-[1.1162rem]/6'
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
