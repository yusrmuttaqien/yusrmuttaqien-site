import { IMAGE_STYLES } from '@/components/Image';

export type ImageProps = {
  className?: Partial<typeof IMAGE_STYLES.slots>;
  scale?: number;
  src: string;
  alt: string;
};
export type InteractiveParams = {
  scale: number;
};
