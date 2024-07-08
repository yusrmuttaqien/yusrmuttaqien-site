import NextHead from 'next/head';
import useContent from '@/components/pages/about/Head/hooks/content';

export default function Head() {
  const { title } = useContent();

  return (
    <NextHead>
      <title key="title">{title} | Yusril Muttaqien</title>
      <meta key="identifier" name="identifier" content="about" />
      <meta key="og:title" property="og:title" content={`${title} | Yusril Muttaqien`} />
      <meta key="twitter:title" property="twitter:title" content={`${title} | Yusril Muttaqien`} />
    </NextHead>
  );
}
