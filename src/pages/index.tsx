import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";

import { RepositoryPageConfig } from "../types";

const addNewConfig = async (config: RepositoryPageConfig) => {
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
    <div className="bg-gray-100 w-screen mx-auto py-6 px-6 lg:px-8 h-screen flex justify-center">
      <Head>
        <title>CrazyGithubLinks</title>
        <meta name="description" content="CrazyGithubLinks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-12 sm:flex-grow max-w-xl">
        <div className="px-4 sm:px-0 mb-10">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            CrazyGithubLinks
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            You can create an awesome page for any repository and share the link
            with your followers on any social network
          </p>
        </div>
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      required
                      name="username"
                      id="username"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor="repository-name"
                    >
                      Repository name
                    </label>
                    <input
                      type="text"
                      required
                      name="repositoryName"
                      id="repository-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                {linkId ? (
                  <div>
                    <Link href={`/r/${linkId}`}>
                      <a
                        target="_blank"
                        className="text-teal-600 text-sm font-medium hover:text-teal-800"
                      >
                        Check the page
                      </a>
                    </Link>
                    {/* TODO: Add posibility to share via one click */}
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-400 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create repository page
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
