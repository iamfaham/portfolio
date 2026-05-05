const GITHUB_USERNAME = "iamfaham";
const GRAPHQL_URL = "https://api.github.com/graphql";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

export interface GitHubStats {
  totalCommits: number;
  commitStreak: number;
}

function calcStreak(days: ContributionDay[]): number {
  // days must be sorted descending by date (newest first)
  const today = new Date().toISOString().split("T")[0];
  let streak = 0;

  for (const day of days) {
    // Skip today if it has no contributions yet (day not over)
    if (day.date === today && day.contributionCount === 0) continue;
    if (day.contributionCount > 0) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const fallback: GitHubStats = { totalCommits: 500, commitStreak: 30 };
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("GITHUB_TOKEN not set — using fallback stats");
    return fallback;
  }

  try {
    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
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
            }
          }
        `,
      }),
      next: { revalidate: 86400 }, // revalidate once per day
    });

    if (!res.ok) return fallback;

    const json = await res.json();
    const collection = json?.data?.user?.contributionsCollection;
    if (!collection) return fallback;

    const totalCommits: number = collection.totalCommitContributions;

    const days: ContributionDay[] = collection.contributionCalendar.weeks
      .flatMap((w: { contributionDays: ContributionDay[] }) => w.contributionDays)
      .sort(
        (a: ContributionDay, b: ContributionDay) =>
          new Date(b.date).getTime() - new Date(a.date).getTime(),
      );

    return { totalCommits, commitStreak: calcStreak(days) };
  } catch (err) {
    console.error("fetchGitHubStats failed:", err);
    return fallback;
  }
}
