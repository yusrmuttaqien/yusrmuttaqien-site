'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ID_LOADER_EXIT } from '@/app/constants/loader';
import classMerge from '@/app/utils/class-merge';

export default function LoaderExit() {
  const pathname = usePathname();

  useEffect(() => {
    const loaderExitEl = document.getElementById(ID_LOADER_EXIT);

    // NOTE: Move to hooks?
    loaderExitEl?.classList.remove('animate-swipe-up-show');
    loaderExitEl?.classList.remove('after:animate-loader-exit');
  }, [pathname]);
  return (
    <div
      id={ID_LOADER_EXIT}
      className={classMerge(
        'fixed inset-0 z-50 bg-beige dark:bg-grey translate-y-full after:opacity-0',
        'after:fixed after:z-[49] after:inset-0 after:bg-grey dark:after:bg-beige after:-translate-y-full after:pointer-events-none'
      )}
    />
  );
}
