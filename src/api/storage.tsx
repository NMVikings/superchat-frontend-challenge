type StorageConfig = {
  url: string;
  writeAccessKey: string;
};

class KeyValueStorage {
  config: StorageConfig;

  constructor(config: StorageConfig) {
    this.config = config;
  }

  private getKeyUrl = (key: string) => `${this.config.url}/${key}`;

  public async getValue(key: string): Promise<any> {
    const url = this.getKeyUrl(key);

    try {
      const response = await fetch(url);
      const data = await response.json();

      return data;
    } catch (err) {
      return null;
    }
  }

  public async addValue(key: string, value: string) {
    const url = this.getKeyUrl(key);

    const response = await fetch(url, {
      method: "PUT",
      body: value,
      headers: {
        Authorization: `Bearer ${this.config.writeAccessKey}`,
      },
    });

    return response;
  }
}

const storageApi = new KeyValueStorage({
  url: process.env.KEY_STORAGE_URL as string,
  writeAccessKey: process.env.STORAGE_WRITE_ACCESS_KEY as string,
});

export default storageApi;
