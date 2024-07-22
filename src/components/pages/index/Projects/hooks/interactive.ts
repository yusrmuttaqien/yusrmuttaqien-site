import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';

export default function useInteractive() {
  const scope = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scope });
  const filterBlur = useTransform(scrollYProgress, [0.1, 0.9], ['blur(0px)', 'blur(16px)']);
  const opacity = useTransform(scrollYProgress, [0.1, 0.9], [1, 0]);

  return { scope, filterBlur, opacity };
}
