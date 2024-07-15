import type { ImageProps, ImageHrefs } from '@/components/Image/type';
import type { Project } from '@/types/contents';
import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';

export type DisplayCardProps = {
  className?: string;
  id?: string;
  image?: Partial<ImageProps>;
  project?: Project;
  content?: {
    src: string | StaticImageData;
    alt: string;
    bottomLeft: ReactNode;
    topRight: string;
    bottomRight: string[];
    topLeft?: ReactNode[];
    hrefs?: ImageHrefs;
  };
};
