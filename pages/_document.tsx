import { Html, Head, Main, NextScript } from "next/document"
export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="Zili Coffee - Cà phê nguyên bản vị cao nguyên Di Linh"
        />
        <link rel="shortcut icon" href="/images/icons/ic_logo.png" />
      </Head>
      <body className="font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
