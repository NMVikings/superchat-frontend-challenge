import type { NextPage } from "next";
import Head from "next/head";

import mockConfig from "../mockConfig.json";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>CrazyGithubLinks</title>
        <meta name="description" content="CrazyGithubLinks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <code>{JSON.stringify(mockConfig, null, 2)}</code>
    </div>
  );
};

export default Home;
