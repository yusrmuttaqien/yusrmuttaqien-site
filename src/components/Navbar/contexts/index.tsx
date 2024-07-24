import ClockStoreProvider from '@/components/Navbar/contexts/clock';
import type { NavbarContextProps } from '@/components/Navbar/contexts/type';

export default function NavbarContexts(props: NavbarContextProps) {
  const { children } = props;

  return <ClockStoreProvider>{children}</ClockStoreProvider>;
}
