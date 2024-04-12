import { useAnimate } from 'framer-motion';

export default function useHomeProjectsEntry() {
  const [scope, animate] = useAnimate();

  return scope;
}
