// GitHub API Configuration
export const GITHUB_CONFIG = {
  // Optional: Add your GitHub personal access token to increase rate limits
  // Get one from: https://github.com/settings/tokens
  // GITHUB_TOKEN: process.env.GITHUB_TOKEN,

  // GitHub API Rate Limit (without token: 60/hour, with token: 5000/hour)
  // The app will work without a token for public repositories

  // Base URL for GitHub API
  BASE_URL: "https://api.github.com",

  // Headers for API requests
  DEFAULT_HEADERS: {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "portfolio-app",
  },
};
