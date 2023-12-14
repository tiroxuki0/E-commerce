import { Html, Head, Main, NextScript } from "next/document"
export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="Mua bán thẻ điện thoại, thẻ game, nạp tiền topup"
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
