import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { StarIcon, HeartIcon, DocumentIcon } from "@heroicons/react/outline";

import type { RepositoryPageConfig, RepositoryInfo } from "../../types";
import ButtonLink from "../../components/ButtonLink";
import {
  checkCanSponsorUser,
  getRepositoryInfo,
  getRepositoryPageConfig,
} from "../../api/server";

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
              <ButtonLink href={html_url} target="_blank" rel="noreferrer">
                <span className="flex items-center gap-1">
                  <StarIcon className="h-5 w-5 text-yellow-500" /> Star
                </span>
              </ButtonLink>
              {canSponsor && (
                <ButtonLink
                  href={`https://github.com/sponsors/${author}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="flex items-center gap-1">
                    <HeartIcon className="h-5 w-5 text-pink-500" /> Become
                    sponsor
                  </span>
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
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
  const canSponsor = await checkCanSponsorUser(username);

  return {
    props: { repositoryPageConfig, repositoryInfo, id: params.id, canSponsor },
  };
};

export default Repository;
