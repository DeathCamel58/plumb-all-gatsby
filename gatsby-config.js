require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: process.env.siteUrl || "https://plumb-all.com",
    title: "Plumb-All",
  },
  plugins: [
    {
      resolve: "gatsby-source-wordpress",
      options: {
        url: process.env.wordpressUrl || "https://wp.plumb-all.com/graphql",
        schema: {
          typePrefix: 'Wp',
          perPage: 20,
          requestConcurrency: 5,
          previewRequestConcurrency: 1,
        },
        develop: {
          hardCacheMediaFiles: true,
        }
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "UA-124176321-1", // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: false,
        },
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-M48PNMP",

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",

        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        // Defaults to gatsby-route-change
        routeChangeEventName: "gatsby-route-change",
        // Defaults to false
        enableWebVitalsTracking: true,
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          allSitePage {
            nodes {
              path
            }
          }
          allWpContentNode(filter: {nodeType: {in: ["Post", "Page"]}}) {
            nodes {
              ... on WpPost {
                uri
                modifiedGmt
              }
              ... on WpPage {
                uri
                modifiedGmt
              }
            }
          }
        }
      `,
        resolveSiteUrl: () => process.env.siteUrl || "https://plumb-all.com",
        output: "/",
        resolvePages: ({
                         allSitePage: { nodes: allPages },
                         allWpContentNode: { nodes: allWpNodes },
                       }) => {
          const wpNodeMap = allWpNodes.reduce((acc, node) => {
            const { uri } = node
            acc[uri] = node

            return acc
          }, {})

          return allPages.map(page => {
            return { ...page, ...wpNodeMap[page.path] }
          })
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          }
        },
      },
    },
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
    `gatsby-plugin-preact`,
  ],
};
