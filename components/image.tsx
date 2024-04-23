import NextImage from 'next/image';
import { tv } from 'tailwind-variants';
import { motion } from 'framer-motion';
import useImageInteractive from '@/hooks/image-interactive';
import type { ImageProps } from '@/types/image';

const NextImageMotion = motion(NextImage);
export const styles = tv({
  slots: {
    container: 'relative overflow-hidden',
    nextImage: 'origin-center duration-1000 ease-out-expo object-cover',
  },
});

export default function Image(props: ImageProps) {
  const { className, imageScale = 1.25, ...rest } = props;
  const { container, nextImage } = styles();
  const { target, y, scale } = useImageInteractive(imageScale);

  return (
    <div className={container({ className: className?.container })}>
      <NextImageMotion
        {...rest}
        fill
        ref={target}
        draggable={false}
        // @ts-expect-error
        style={{ y, scale }}
        className={nextImage({ className: className?.nextImage?.replace('scale', 'none') })}
      />
    </div>
  );
}
