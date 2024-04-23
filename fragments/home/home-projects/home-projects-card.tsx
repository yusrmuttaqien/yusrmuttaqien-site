import Link from '@/components/link';
import Image from '@/components/image';
import type { ProjectsCardProps } from '@/types/home';
import classMerge from '@/utils/class-merge';
import useContent from '@/contents/home';

export default function HomeProjectsCard({ className, content }: ProjectsCardProps) {
  const { image, title, type } = content;
  const {
    projects: { card },
  } = useContent();

  return (
    <Link href={`/projects/${title}`}>
      <figure
        className={classMerge(
          'relative border border-grey-dynamic-[20]',
          'p-[0.625rem] isolate',
          className
        )}
      >
        <p className="absolute top-5 right-5 left-5 z-10 mix-blend-difference uppercase text-beige">
          {card.singular} {type}
        </p>
        <Image
          alt={`${title}-preview`}
          src={image}
          className={{ container: 'w-full h-full z-0' }}
        />
        <figcaption
          className={classMerge(
            'absolute project-title bottom-5 right-5 left-5 z-10 mix-blend-difference',
            'uppercase before:table before:-mb-[0.05em] after:table after:-mt-[0.2em]',
            'break-words text-beige'
          )}
        >
          {title}
        </figcaption>
      </figure>
    </Link>
  );
}
