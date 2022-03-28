export type RepositoryPageConfig = {
  username: string;
  repositoryName: string;
  icon: string;
};

export type RepositoryInfo = {
  owner: { login: string; avatar_url: string };
  description: string;
  stargazers_count: string;
  name: string;
  forks_count: string;
  open_issues_count: string;
  html_url: string;
};
