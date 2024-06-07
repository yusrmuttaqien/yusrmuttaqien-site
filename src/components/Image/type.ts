import { IMAGE_STYLES } from '@/components/Image';
import type { StaticImageData } from 'next/image';

export type ImageProps = {
  className?: Partial<typeof IMAGE_STYLES.slots>;
  scale?: number;
  src: string | StaticImageData;
  alt: string;
};
export type InteractiveParams = {
  scale: number;
};
