/** next-sitemap.config.js */
module.exports = {
  siteUrl: 'https://portfolio-ansif.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/drafts/*',
    '/icon.png',
  ],
}
