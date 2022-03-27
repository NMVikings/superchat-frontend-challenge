import type { NextPage } from "next";
import Head from "next/head";

import mockConfig from "../mockConfig.json";
import { RepositoryConfig } from "../types";

const Home: NextPage = () => {
  const addNewConfig = async (config: RepositoryConfig) => {
    await fetch("/api/configs", {
      method: "POST",
      body: JSON.stringify(config),
    });
  };

  return (
    <div>
      <Head>
        <title>CrazyGithubLinks</title>
        <meta name="description" content="CrazyGithubLinks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <code>{JSON.stringify(mockConfig, null, 2)}</code>
      <button
        onClick={() => {
          addNewConfig(mockConfig);
        }}
      >
        Create link with default config
      </button>
    </div>
  );
};

export default Home;
