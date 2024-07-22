import NextHead from 'next/head';
import useContent from '@/components/pages/projects/Head/hooks/content';

export default function Head() {
  const { title } = useContent();
  const completeTitle = `${title} | Yusril Muttaqien`;

  return (
    <NextHead>
      <title key="title">{completeTitle}</title>
      <meta key="identifier" name="identifier" content="projects" />
      <meta key="og:title" property="og:title" content={completeTitle} />
      <meta key="twitter:title" property="twitter:title" content={completeTitle} />
    </NextHead>
  );
}
