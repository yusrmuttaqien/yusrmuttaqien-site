import Spline from '@splinetool/react-spline';
import { Application } from '@splinetool/runtime';
import useInteractive from '@/components/pages/index/COD/hooks/interactive';
import classMerge from '@/utils/classMerge';
import { COORDS } from '@/components/pages/index/COD/constant';
import type { CODProps } from '@/components/pages/index/COD/type';

export default function COD(props: CODProps) {
  const { className } = props;
  const { wrapper, spline, cycle, syncBGColor } = useInteractive({ COORDS });

  function _load(e: Application) {
    spline.current = e;
    syncBGColor();

    COORDS.reset.forEach(([key], idx) => {
      COORDS.reset[idx] = [key, e.getVariable(key as string) as number];
    });
  }

  return (
    <section className={classMerge('-mx-5 xl:-mx-8', className)} onClick={cycle}>
      <Spline scene={process.env.NEXT_PUBLIC_COD_SPLINE as string} onLoad={_load} ref={wrapper} />
    </section>
  );
}
