import type { AppProps } from "next/app";
import Head from "next/head";
import MetaTags from "../components/MetaTags";

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  const title = "CrazyGithubLinks";
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <MetaTags title={title} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
