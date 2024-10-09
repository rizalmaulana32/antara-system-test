import axiosInstance from "@/lib/axiosInstance";

interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
}

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

class RepositoryService {
  async getRepositories(
    orgName: string,
    page: number = 1,
    perPage: number = 10
  ): Promise<Repo[]> {
    try {
      const response = await axiosInstance.get<Repo[]>(
        `/orgs/${orgName}/repos`,
        {
          params: {
            page,
            per_page: perPage,
          },
        }
      );
      return response.data.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
      );
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch repositories");
    }
  }

  async getCommits(
    orgName: string,
    repoName: string,
    page: number = 1,
    perPage: number = 10
  ): Promise<Commit[]> {
    try {
      const response = await axiosInstance.get<Commit[]>(
        `/repos/${orgName}/${repoName}/commits`,
        {
          params: {
            page,
            per_page: perPage,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch commits");
    }
  }
}

const repositoryService = new RepositoryService();
export default repositoryService;
