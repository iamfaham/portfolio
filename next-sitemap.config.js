/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://iamfaham.me",
  generateRobotsTxt: true,
  // optional
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};

module.exports = config;
