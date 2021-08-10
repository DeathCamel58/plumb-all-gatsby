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
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Defaults used for gatsbyImageData and StaticImage
        defaults: {},
        // Set to false to allow builds to continue on image errors
        failOnError: true,
        // deprecated options and their defaults:
        base64Width: 20,
        forceBase64Format: `png`,
        useMozJpeg: true,
        stripMetadata: true,
        defaultQuality: 70,
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Plumb-All`,
        short_name: `Plumb-All`,
        start_url: `/`,
        background_color: `#27aae1`,
        theme_color: `#27aae1`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    'gatsby-plugin-next-seo',
  ],
};
