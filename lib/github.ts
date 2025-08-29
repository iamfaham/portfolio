import axios from "axios";
import { GITHUB_CONFIG } from "./config";
import { formatProjectTitle } from "./utils";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  archived: boolean;
  disabled: boolean;
}

export interface Project {
  title: string;
  description: string;
  projectUrl: string;
  technologies: string[];
  image: string | null;
  githubData?: GitHubRepo;
}

class GitHubService {
  private baseURL = GITHUB_CONFIG.BASE_URL;

  private getHeaders() {
    const headers: Record<string, string> = {
      ...GITHUB_CONFIG.DEFAULT_HEADERS,
    };

    // Add token if available (optional)
    if (process.env.GITHUB_TOKEN) {
      headers["Authorization"] = `token ${process.env.GITHUB_TOKEN}`;
    }

    return headers;
  }

  async getRepository(owner: string, repo: string): Promise<GitHubRepo> {
    try {
      const response = await axios.get(
        `${this.baseURL}/repos/${owner}/${repo}`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching repository ${owner}/${repo}:`, error);
      throw error;
    }
  }

  async getRepositoryTopics(owner: string, repo: string): Promise<string[]> {
    try {
      const response = await axios.get(
        `${this.baseURL}/repos/${owner}/${repo}/topics`,
        {
          headers: {
            ...this.getHeaders(),
            Accept: "application/vnd.github.mercy-preview+json",
          },
        }
      );
      return response.data.names || [];
    } catch (error) {
      console.error(`Error fetching topics for ${owner}/${repo}:`, error);
      return [];
    }
  }

  async getRepositoryWithTopics(
    owner: string,
    repo: string
  ): Promise<GitHubRepo> {
    try {
      const [repoData, topics] = await Promise.all([
        this.getRepository(owner, repo),
        this.getRepositoryTopics(owner, repo),
      ]);

      return {
        ...repoData,
        topics,
      };
    } catch (error) {
      console.error(
        `Error fetching repository with topics ${owner}/${repo}:`,
        error
      );
      throw error;
    }
  }

  // Convert GitHub repo data to our Project interface
  convertToProject(githubRepo: GitHubRepo): Project {
    return {
      title: formatProjectTitle(githubRepo.name),
      description: githubRepo.description || "No description available",
      projectUrl: githubRepo.html_url,
      technologies: githubRepo.topics || [],
      image: null,
      githubData: githubRepo,
    };
  }
}

export const githubService = new GitHubService();
