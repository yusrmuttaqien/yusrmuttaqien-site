import NavbarClock from '@/app/components/navbar-clock';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 right-0 flex flex-col gap-[0.465rem] items-center py-[0.3719rem] px-[1.1162rem] ">
      <div className="flex justify-between self-stretch">
        <p className="text-[0.7444rem]">Malang, Indonesia</p>
        <NavbarClock className="text-[0.7444rem]" />
      </div>
      <YusrMuttaqien as="p" className="text-[0.9794rem]" />
    </nav>
  );
}
