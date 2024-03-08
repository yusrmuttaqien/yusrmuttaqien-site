'use client';

import { useImmer } from 'use-immer';
import { useScroll } from 'framer-motion';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';
import { SCROLL_TRESHOLD } from '@/app/constants/navbar-yusr-muttaqien';

export default function NavbarYusrMuttaqien() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useImmer(false);

  scrollYProgress.on('change', (v) => {
    if (v < SCROLL_TRESHOLD) {
      setShow(false);
    } else {
      setShow(true);
    }
  });

  return show && <YusrMuttaqien />;
}
