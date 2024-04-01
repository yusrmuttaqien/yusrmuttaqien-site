import classMerge from '@/app/utils/class-merge';
import { ID_LOADER_EXIT } from '@/app/constants/loader';

export default function LoaderExit() {
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
