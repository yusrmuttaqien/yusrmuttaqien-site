import { tv } from 'tailwind-variants';
import NextImage from 'next/image';
import { motion } from 'framer-motion';
import useInteractive from '@/components/Image/hooks/interactive';
import type { ImageProps } from '@/components/Image/type';

export const IMAGE_STYLES = tv({
  slots: {
    container: 'overflow-hidden',
    wrapper: 'relative h-full w-full duration-500 ease-out-quart',
    image: 'object-cover',
  },
});

export default function Image(props: ImageProps) {
  const {
    scale: scaleFactor = 1.5,
    className,
    src = 'https://source.unsplash.com/random',
    alt = 'unsplash',
    ...rest
  } = props;
  const { container, image, wrapper } = IMAGE_STYLES();
  const { scope, y, scale } = useInteractive({ scale: scaleFactor });

  return (
    <div ref={scope} className={container({ className: className?.container })}>
      <motion.div
        id="wrapper"
        className={wrapper({ className: className?.wrapper })}
        style={{ y, scale }}
      >
        <NextImage
          {...rest}
          fill
          alt={alt}
          src={src}
          sizes="100%"
          draggable={false}
          className={image({ className: className?.image })}
        />
      </motion.div>
    </div>
  );
}
