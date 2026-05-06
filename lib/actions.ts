const GITHUB_USERNAME = "iamfaham";
const GRAPHQL_URL = "https://api.github.com/graphql";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface GitHubStats {
  totalCommits: number;
  commitStreak: number;
  totalStars: number;
}

export interface PinnedRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  languageColor: string | null;
  topics: string[];
  homepageUrl: string | null;
}

function calcStreak(days: ContributionDay[]): number {
  const today = new Date().toISOString().split("T")[0];
  let streak = 0;
  for (const day of days) {
    if (day.date === today && day.contributionCount === 0) continue;
    if (day.contributionCount > 0) streak++;
    else break;
  }
  return streak;
}

const QUERY = `
  query {
    user(login: "${GITHUB_USERNAME}") {
      contributionsCollection {
        totalCommitContributions
        contributionCalendar {
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
        nodes {
          stargazerCount
        }
      }
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage { name color }
            repositoryTopics(first: 6) {
              nodes { topic { name } }
            }
            homepageUrl
          }
        }
      }
    }
  }
`;

async function fetchFromGitHub() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: QUERY }),
    next: { revalidate: 86400 },
  });

  if (!res.ok) return null;
  const json = await res.json();
  return json?.data?.user ?? null;
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const fallback: GitHubStats = { totalCommits: 500, commitStreak: 30, totalStars: 50 };
  try {
    const user = await fetchFromGitHub();
    if (!user) return fallback;

    const collection = user.contributionsCollection;
    const totalCommits: number = collection.totalCommitContributions;

    const days: ContributionDay[] = collection.contributionCalendar.weeks
      .flatMap((w: { contributionDays: ContributionDay[] }) => w.contributionDays)
      .sort((a: ContributionDay, b: ContributionDay) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    const totalStars: number = user.repositories.nodes.reduce(
      (sum: number, r: { stargazerCount: number }) => sum + r.stargazerCount,
      0
    );

    return { totalCommits, commitStreak: calcStreak(days), totalStars };
  } catch (err) {
    console.error("fetchGitHubStats failed:", err);
    return fallback;
  }
}

interface RawPinnedRepo {
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string; color: string } | null;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
  homepageUrl: string | null;
}

export async function fetchPinnedRepos(): Promise<PinnedRepo[]> {
  try {
    const user = await fetchFromGitHub();
    if (!user) return [];

    return (user.pinnedItems.nodes as RawPinnedRepo[]).map((r): PinnedRepo => ({
      name: r.name,
      description: r.description ?? "",
      url: r.url,
      stars: r.stargazerCount,
      forks: r.forkCount,
      language: r.primaryLanguage?.name ?? null,
      languageColor: r.primaryLanguage?.color ?? null,
      topics: r.repositoryTopics.nodes.map((n) => n.topic.name),
      homepageUrl: r.homepageUrl || null,
    }));
  } catch (err) {
    console.error("fetchPinnedRepos failed:", err);
    return [];
  }
}
