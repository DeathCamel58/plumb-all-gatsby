module.exports = {
  siteMetadata: {
    siteUrl: "https://plumb-all.com",
    title: "Plumb-All",
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: "https://wp.plumb-all.com/graphql",
        schema: {
          typePrefix: 'Wp',
        },
        develop: {
          hardCacheMediaFiles: true,
        }
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-124176321-1",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
