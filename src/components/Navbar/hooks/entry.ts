import { useAnimate } from 'framer-motion';

export default function useEntry() {
  const [scope, animate] = useAnimate();

  return { scope };
}
