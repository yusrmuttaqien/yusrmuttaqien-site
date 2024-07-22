import { useTransform, type MotionStyle } from 'framer-motion';
import type { InteractiveParams } from '@/components/pages/index/Hero/fragments/LinksItem/type';

export default function useInteractive(props: InteractiveParams) {
  const { rootMotionValue, idx } = props;
  const z = useTransform(rootMotionValue, [0 + (idx + 1 * 2) / 10, 1], ['0px', '1000px']);
  const opacity = useTransform(rootMotionValue, [0 + (idx + 1 * 2) / 10, 1], [1, 0]);
  const filter = useTransform(
    rootMotionValue,
    [0 + (idx + 1 * 2) / 10, 1],
    ['blur(0px)', 'blur(16px)']
  );

  return { z, opacity, filter } as MotionStyle;
}
