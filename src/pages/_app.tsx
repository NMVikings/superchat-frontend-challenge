import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  const title = "CrazyGithubLinks";
  const description = "Best promo page for your repository";
  const imageUrl = "https://gcdnb.pbrd.co/images/0Yj0VsSgOBRS.jpg";
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={process.env.BASE_URL} />
        <meta property="og:image" content={imageUrl} />
        <meta name="description" content={title} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
