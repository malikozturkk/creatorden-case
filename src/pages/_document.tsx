import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>CreatorDen Influencer Tool</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />

        <link
          rel="icon"
          href="https://creatorden.com/wp-content/uploads/2017/04/cropped-creatorden_logo-e1507569533402-32x32.png"
          sizes="32x32"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
