import { IMAGE_STYLES } from '@/components/Image';
import type { StaticImageData, ImageProps as NextImageProps } from 'next/image';

export type ImageProps = {
  className?: Partial<typeof IMAGE_STYLES.slots>;
  scale?: number;
  src?: string | StaticImageData;
  alt?: string;
} & Omit<NextImageProps, 'className' | 'src' | 'alt'>;
export type InteractiveParams = {
  scale: number;
};
