import type { NextPage } from "next";
import Link from "next/link";
import React from "react";

import { RepositoryPageConfig } from "../types";

const addNewConfig = async (config: RepositoryPageConfig) => {
  const response = await fetch("/api/configs", {
    method: "POST",
    body: JSON.stringify(config),
  });
  if (response.status === 400) {
    throw new Error("Repository wasn't found");
  }
  const body = await response.json();

  return body;
};

const Home: NextPage = () => {
  const [linkId, setLinkId] = React.useState(null);
  const [copied, setCopied] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const username = form.get("username") as string;
    const repositoryName = form.get("repositoryName") as string;
    const icon = form.get("icon") as string;

    try {
      setLoading(true);
      setError(null);

      const { id } = await addNewConfig({ username, repositoryName, icon });
      setLinkId(id);
    } catch (err) {
      const message = (err as Error)?.message ?? "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (path: string) => {
    navigator.clipboard.writeText(window.location.origin + path);
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  return (
    <div className="bg-gray-100 w-screen mx-auto py-6 px-6 lg:px-8 flex justify-center h-screen">
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
        <form onSubmit={handleSubmit}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-2 grid-rows-2 gap-6">
                <div className="col-span-2 sm:col-span-1">
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
                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor="repositoryName"
                  >
                    Repository name
                  </label>
                  <input
                    type="text"
                    required
                    name="repositoryName"
                    id="repositoryName"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="icon"
                  >
                    Icon
                  </label>
                  <div className="flex gap-4">
                    <div className="flex gap-1 items-center">
                      <input
                        type="radio"
                        defaultChecked
                        required
                        name="icon"
                        value="✨"
                      />
                      ✨
                    </div>
                    <div className="flex gap-1 items-center">
                      <input type="radio" required name="icon" value="🔥" />
                      🔥
                    </div>
                    <div className="flex gap-1 items-center">
                      <input type="radio" required name="icon" value="❤️" />
                      ❤️
                    </div>

                    <div className="flex gap-1 items-center">
                      <input type="radio" required name="icon" value="💕" />
                      💕
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              {linkId ? (
                <div>
                  <Link href={`/r/${linkId}`}>
                    <a
                      target="_blank"
                      className="text-teal-600 text-sm font-medium hover:text-teal-800 mr-4"
                    >
                      Check the page
                    </a>
                  </Link>
                  <button
                    type="button"
                    disabled={copied}
                    onClick={() => copyToClipboard(`/r/${linkId}`)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-400 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {copied ? "Copied" : "Copy link"}
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-red-600 mr-4 text-sm">{error}</span>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:bg-indigo-400 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create repository page
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
