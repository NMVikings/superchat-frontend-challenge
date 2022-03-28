import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CrazyGithubLinks</title>
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content={window.location.href} /> */}
        <meta property="og:image" content="https://ibb.co/FJWF3fv" />
        <meta name="description" content="CrazyGithubLinks" />
        <meta name="twitter:title" content="European Travel Destinations " />
        <meta name="twitter:description" content="CrazyGithubLinks" />
        <meta name="twitter:image" content="https://ibb.co/FJWF3fv" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
