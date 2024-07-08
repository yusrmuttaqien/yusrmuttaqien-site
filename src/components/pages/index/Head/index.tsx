import NextHead from 'next/head';
import { useRouter } from 'next/router';
import useContent from '@/components/pages/index/Head/hooks/content';
import Preview from '@/components/pages/index/Head/contents/images/base_preview.jpg';

export default function Head() {
  const { asPath } = useRouter();
  const { description } = useContent();

  return (
    <NextHead>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="author" content="Yusril Muttaqien" />
      <link
        href="/favicon-dark.ico"
        rel="shortcut icon"
        type="image/x-icon"
        media="(prefers-color-scheme: light)"
      />
      <link
        href="/favicon-light.ico"
        rel="shortcut icon"
        type="image/x-icon"
        media="(prefers-color-scheme: dark)"
      />
      <link
        href="/icon-dark.png"
        rel="apple-touch-icon image_src"
        type="image/png"
        media="(prefers-color-scheme: light)"
      />
      <link
        href="/icon-light.png"
        rel="apple-touch-icon image_src"
        type="image/png"
        media="(prefers-color-scheme: dark)"
      />
      {
        // #region Changable head tags
      }
      <title key="title">Yusril Muttaqien</title>
      <meta key="description" name="description" content={description} />
      <meta key="identifier" name="identifier" content="index" />
      <meta key="og:image" property="og:image" content={Preview.src} />
      <meta key="og:site_name" property="og:site_name" content="Yusril Muttaqien" />
      <meta
        key="og:url"
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_BASE_URL}${asPath.split('#')[0]}`}
      />
      <meta key="twitter:card" property="twitter:card" content="summary_large_image" />
      {
        // #endregion Changable head tags
      }
    </NextHead>
  );
}
