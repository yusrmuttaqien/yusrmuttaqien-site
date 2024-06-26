import NextHead from 'next/head';
import useContent from '@/components/pages/about/Head/hooks/content';

export default function Head() {
  const { title } = useContent();

  return (
    <NextHead>
      <title key="title">{title} | Yusril Muttaqien</title>
      <meta key="identifier" name="identifier" content="about" />
    </NextHead>
  );
}
