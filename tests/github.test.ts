import { beforeEach, describe, expect, it, vi } from "vitest";

const axiosGet = vi.fn();
vi.mock("axios", () => ({ default: { get: axiosGet } }));

describe("GitHub REST service", async () => {
  const { githubService } = await import("@/lib/github");

  beforeEach(() => vi.clearAllMocks());

  it("maps repository data to a project", () => {
    expect(githubService.convertToProject({ id: 1, name: "my-project", full_name: "me/my-project", description: null, html_url: "https://github.com/me/my-project", homepage: null, language: "TypeScript", stargazers_count: 1, forks_count: 0, topics: ["nextjs"], created_at: "", updated_at: "", archived: false, disabled: false })).toMatchObject({ title: "My Project", description: "No description available", technologies: ["nextjs"] });
  });

  it("fetches topics and handles a topics failure", async () => {
    axiosGet.mockResolvedValueOnce({ data: { names: ["ai"] } });
    await expect(githubService.getRepositoryTopics("me", "repo")).resolves.toEqual(["ai"]);
    axiosGet.mockRejectedValueOnce(new Error("offline"));
    await expect(githubService.getRepositoryTopics("me", "repo")).resolves.toEqual([]);
  });
});
