import { motion } from 'framer-motion';
import Image from '@/components/image';
import classMerge from '@/utils/class-merge';
import useContent from '@/contents/home';
import type { HowDesktopCardProps } from '@/types/home';

export default function HomeHowDesktopCard({ className, active, control }: HowDesktopCardProps) {
  const {
    how: { hows },
  } = useContent();
  const howsArray = Object.entries(hows);

  return (
    <div className={classMerge('relative shrink-0', className)}>
      <motion.figure
        layout
        data-framer="how-card"
        animate={control}
        className={classMerge(
          'border border-grey/20 dark:border-beige/20',
          'p-[0.625rem] space-y-[0.625rem] h-max overflow-hidden',
          'w-full absolute top-0 left-0 -mt-[30%]'
        )}
      >
        <div className="relative overflow-hidden">
          {howsArray.map(([key, { image }]) => (
            <CardImage key={`${key}-img`} image={image} name={key} />
          ))}
          <div className="w-full aspect-video" />
        </div>
        <div className="relative overflow-hidden">
          {howsArray.map(([key, { desc }]) => (
            <CardDesc key={`${key}-desc`} desc={desc} name={key} />
          ))}
          <figcaption className="invisible">{active && hows[active].desc}</figcaption>
        </div>
      </motion.figure>
    </div>
  );
}

function CardImage({ image, name }: { image: string; name: string }) {
  return (
    <motion.div data-framer={`how-card-desktop-${name}-img`} className="absolute inset-0">
      <Image
        src={image}
        alt={`coc-preview-${name}`}
        className={{ container: 'w-full aspect-video' }}
      />
    </motion.div>
  );
}

function CardDesc({ desc, name }: { desc: string; name: string }) {
  return (
    <motion.figcaption
      data-framer={`how-card-desktop-${name}-desc`}
      className="absolute inset-0 h-max"
    >
      {desc}
    </motion.figcaption>
  );
}
