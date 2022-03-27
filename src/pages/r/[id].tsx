import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import githubApi from "../../api/github";
import storageApi from "../../api/storage";

import type { RepositoryPageConfig, RepositoryInfo } from "../../types";

const Repository: NextPage<{
  repositoryPageConfig: RepositoryPageConfig;
  repositoryInfo: RepositoryInfo;
}> = ({ repositoryPageConfig, repositoryInfo }) => {
  return (
    <div>
      <Head>
        <title>{repositoryInfo.fullName}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <code>{JSON.stringify(repositoryPageConfig, null, 2)}</code>
      </div>
      <div>
        <code>{JSON.stringify(repositoryInfo, null, 2)}</code>
      </div>
    </div>
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

  return {
    props: { repositoryPageConfig, repositoryInfo },
  };
};

export default Repository;
