import { motion } from 'framer-motion';
import useAnnouncerInteractive from '@/hooks/announcer-interactive';
import classMerge from '@/utils/class-merge';

export default function Announcer() {
  const { control } = useAnnouncerInteractive();

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={control}
      className={classMerge(
        'fixed top-0 left-0 right-0 z-[101]',
        'mask-image-[radial-gradient(circle,_rgba(2,0,36,1)_0%,_rgba(0,212,255,0)_100%)]'
      )}
    >
      <span className="bg-grey-dynamic-[80] w-full h-[0.0938rem] block" />
    </motion.div>
  );
}
