import { Html, Head, Main, NextScript, type DocumentProps } from 'next/document';

export default function Document(props: DocumentProps) {
  const { locale } = props;

  return (
    <Html lang={locale}>
      <Head />
      <body data-lenis-prevent>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
