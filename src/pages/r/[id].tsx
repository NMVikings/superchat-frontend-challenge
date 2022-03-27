import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import storage from "../../storage";

import { RepositoryConfig } from "../../types";

const Repository: NextPage<{
  repositoryConfig: RepositoryConfig;
}> = ({ repositoryConfig }) => {
  return (
    <div>
      <Head>
        <title>
          {repositoryConfig.userName}/{repositoryConfig.repositoryName}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <code>{JSON.stringify(repositoryConfig, null, 2)}</code>
    </div>
  );
};

const getRepositoryConfig = async (
  id: string
): Promise<RepositoryConfig | null> => {
  try {
    const value = await storage.getValue(id);

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

  const repositoryConfig = await getRepositoryConfig(params.id);

  if (!repositoryConfig) {
    return { notFound: true };
  }

  return {
    props: { repositoryConfig },
  };
};

export default Repository;
