import { RepositoryInfo, RepositoryPageConfig } from "../types";
import githubApi from "./github";
import storageApi from "./storage";

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

const checkCanSponsorUser = async (username: string) => {
  const sponsoredUrl = `https://github.com/sponsors/${username}`;
  try {
    const { url } = await fetch(sponsoredUrl, {
      headers: { "Content-Length": "0" },
    });

    return url === sponsoredUrl;
  } catch (err) {
    return null;
  }
};
export { getRepositoryPageConfig, getRepositoryInfo, checkCanSponsorUser };
