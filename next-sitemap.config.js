/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://iamfaham.netlify.app",
  generateRobotsTxt: true,
  // optional
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
  },
};

module.exports = config;
