'use client';

import { useScroll } from 'framer-motion';
import { useImmer } from 'use-immer';
import YusrMuttaqien from '@/app/components/yusr-muttaqien';
import { SCROLL_TRESHOLD } from '@/app/constants/navbar-yusr-muttaqien';

export default function MainHeroYusrMuttaqien() {
  const { scrollYProgress } = useScroll();
  const [show, setShow] = useImmer(true);

  scrollYProgress.on('change', (v) => {
    if (v < SCROLL_TRESHOLD) {
      setShow(true);
    } else {
      setShow(false);
    }
  });

  return (
    <div className="relative w-full">
      {show && <YusrMuttaqien className="absolute top-0 left-0" />}
      <div className="w-full opacity-0">
        <YusrMuttaqien />
      </div>
    </div>
  );
}
