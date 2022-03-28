import { RepositoryInfo } from "../types";

class GithubApi {
  apiUrl = "https://api.github.com";

  public async getRepository(
    username: string,
    repositoryName: string
  ): Promise<RepositoryInfo | null> {
    const url = `${this.apiUrl}/repos/${username}/${repositoryName}`;

    try {
      const response = await fetch(url);
      if (response.status !== 200) {
        return null;
      }
      const data = await response.json();

      return data;
    } catch (err) {
      return null;
    }
  }
}

const githubApi = new GithubApi();

export default githubApi;
