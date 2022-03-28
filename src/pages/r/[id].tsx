import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { StarIcon, HeartIcon, DocumentIcon } from "@heroicons/react/outline";
import githubApi from "../../api/github";
import storageApi from "../../api/storage";

import type { RepositoryPageConfig, RepositoryInfo } from "../../types";
import Image from "next/image";

const Repository: NextPage<{
  repositoryPageConfig: RepositoryPageConfig;
  repositoryInfo: RepositoryInfo;
  id: string;
  canSponsor: boolean;
}> = ({ repositoryInfo, repositoryPageConfig, id, canSponsor }) => {
  const {
    owner: { login: author, avatar_url },
    description,
    stargazers_count,
    name,
    forks_count,
    open_issues_count,
    html_url,
  } = repositoryInfo;
  const { icon = "✨" } = repositoryPageConfig;

  const title = [icon, name, icon].join(" ");

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:url" content={`${process.env.BASE_URL}/r/${id}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid gap-6 grid-cols-3 grid-row-3">
            <h1 className="w-100 text-center text-3xl mb-4 break-normal col-span-3">
              {title}
            </h1>
            <div className="col-span-2">
              <div className="flex gap-1">
                Owner:{" "}
                <span className="flex items-center gap-1">
                  <Image
                    src={avatar_url}
                    width="20"
                    height="20"
                    alt="logo"
                    className="rounded-md"
                  />{" "}
                  {author}{" "}
                </span>
              </div>
              {description && <div>Description: {description}</div>}
            </div>
            <div>
              <div className="flex items-center gap-1">
                Stars: {stargazers_count}{" "}
                <StarIcon className="h-5 w-5 text-yellow-500" />
              </div>

              <div>Forks: {forks_count} 🍴</div>
              <div className="flex items-center gap-1">
                Open issues: {open_issues_count}{" "}
                <DocumentIcon className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="col-span-3 flex gap-2 mt-3">
              <a
                href={html_url}
                target="_blank"
                rel="noreferrer"
                className="p-1 px-2 border hover:ring-indigo-500 hover:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md cursor-pointer"
              >
                <span className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 text-yellow-500" /> Star
                </span>
              </a>
              {canSponsor && (
                <a
                  href={`https://github.com/sponsors/${author}`}
                  // TODO check is it possible to sponsor someone check the response url
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 px-2 border hover:ring-indigo-500 hover:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md cursor-pointer"
                >
                  <span className="flex items-center gap-1">
                    <HeartIcon className="h-5 w-5 text-pink-500" /> Become
                    sponsor
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const getRepositoryPageConfig = async (
  id: string
): Promise<RepositoryPageConfig | null> => {
  try {
    const value = await storageApi.getValue(id);

    return value;
  } catch (err) {
    return null;
  }
};

const getRepositoryInfo = async (
  username: string,
  repositoryName: string
): Promise<RepositoryInfo | null> => {
  try {
    const value = await githubApi.getRepository(username, repositoryName);

    return value;
  } catch (err) {
    return null;
  }
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params || typeof params.id !== "string") {
    return {
      notFound: true,
    };
  }

  const repositoryPageConfig = await getRepositoryPageConfig(params.id);

  if (!repositoryPageConfig) {
    return { notFound: true };
  }

  const { username, repositoryName } = repositoryPageConfig;
  const repositoryInfo = await getRepositoryInfo(username, repositoryName);

  if (!repositoryInfo) {
    return { notFound: true };
  }
  const sponsoredUrl = `https://github.com/sponsors/${username}`;
  const { url } = await fetch(sponsoredUrl, {
    headers: { "Content-Length": "0" },
  });

  const canSponsor = url === sponsoredUrl;

  return {
    props: { repositoryPageConfig, repositoryInfo, id: params.id, canSponsor },
  };
};

export default Repository;
