import { RepositoryPageConfig } from "../types";

const postNewConfig = async (config: RepositoryPageConfig) => {
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

export { postNewConfig };
