import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import { RepositoryConfig } from "../types";

const addNewConfig = async (config: RepositoryConfig) => {
  const response = await fetch("/api/configs", {
    method: "POST",
    body: JSON.stringify(config),
  });
  const body = await response.json();

  return body;
};

const Home: NextPage = () => {
  const [linkId, setLinkId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    // TODO: Check if this repository valid

    const username = form.get("username") as string;
    const repositoryName = form.get("repositoryName") as string;

    try {
      setLoading(true);
      const { id } = await addNewConfig({ username, repositoryName });
      setLinkId(id);
    } catch (err) {
      // TODO: handle errors
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>CrazyGithubLinks</title>
        <meta name="description" content="CrazyGithubLinks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input required name="username" />
        </label>
        <label>
          RepositoryName
          <input required name="repositoryName" />
        </label>
        <button type="submit" disabled={loading}>
          Create link with default config
        </button>
      </form>
      {linkId && (
        <div>
          <Link href={`/r/${linkId}`}>
            <a target="_blank">{linkId}</a>
            {/* TODO: Add an iframe for showing how resulted page will look like */}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
