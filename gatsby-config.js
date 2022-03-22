require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
      title: `new`,
    siteUrl: `https://competent-stonebraker-cc433a.netlify.app/`
  },
  plugins: [
    `gatsby-plugin-advanced-sitemap`,
    'gatsby-plugin-image',
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        footnotes: true,
        gfm: true,
        plugins: [],
      },
    },
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATOCMS_API_TOKEN,
        preview: false,
        disableLiveReload: false,
      },
    },
  ]
};