/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Script } from "gatsby"
import ProSchemasManual from "./ProSchemasManual.js";

const SEOPress = ({ postOrPage, props, title }) => {
    const siteSEO = useStaticQuery(graphql`query SEO {
  wp {
    seoPressSettings {
      social {
        accountFacebook
        accountInstagram
        accountLinkedIn
        accountPinterest
        accountTwitter
        accountYoutube
        facebookAdminId
        facebookAppId
        facebookImg {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FIXED)
            }
          }
        }
        facebookImgDefault
        facebookLinkOwnershipId
        facebookOg
        knowledgeContactOption
        knowledgeContactType
        knowledgeImg {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FIXED)
            }
          }
        }
        knowledgeName
        knowledgePhone
        knowledgeType
        twitterCard
        twitterCardImg {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FIXED)
            }
          }
        }
        twitterCardImgSize
        twitterCardOg
      }
      pro {
        localBusinessCity
        localBusinessCountry
        localBusinessLatitude
        localBusinessLongitude
        localBusinessOpeningHours {
          monday {
            am {
              end {
                hour
                minute
              }
              start {
                hour
                minute
              }
              open
            }
            closed
            pm {
              end {
                hour
                minute
              }
              open
              start {
                hour
                minute
              }
            }
          }
        }
        localBusinessPhone
        localBusinessPlaceId
        localBusinessPostalCode
        localBusinessPriceRange
        localBusinessSchemaPage
        localBusinessState
        localBusinessStreetAddress
        localBusinessType
        localBusinessUrl
      }
    }
  }
  site {
    siteMetadata {
      siteUrl
    }
  }
  wp {
    generalSettings {
      title
      description
    }
  }
}
`
    )

    if (postOrPage === '404') {
        return (
            <>
                <title>{siteSEO.wp.generalSettings.title}</title>
                <meta name="description" content={`404 - This page does not exist.`} />
            </>
        )
    }

    return <>
        <meta httpEquiv="Content-Type" content="en-us" />
        <title>{siteSEO.wp.generalSettings.title}{postOrPage.title ? ' - ' + postOrPage.title : ''}</title>
        <meta name="description" content={postOrPage.seo.metaDesc ? postOrPage.seo.metaDesc : ''} />
        <link rel="canonical" href={postOrPage.seo.canonicalUrl ? postOrPage.seo.canonicalUrl : props} />

        {/* Insert Pro Schemas */}
        {postOrPage.seo.proSchemasManual && postOrPage.seo.proSchemasManual !== "\"\"" &&
         postOrPage.seo.proSchemasManual !== "[{\"_seopress_pro_rich_snippets_type\":\"none\"}]" &&
         postOrPage.seo.proSchemasManual !== "{\"_seopress_pro_rich_snippets_type\":\"none\"}"?
            JSON.parse(postOrPage.seo.proSchemasManual).map(proSchema => {
                let key = ``

                if (proSchema._seopress_pro_rich_snippets_type === 'services') {
                    key = `service-${proSchema._seopress_pro_rich_snippets_service_type ? proSchema._seopress_pro_rich_snippets_service_type : 'noServiceType'}-${proSchema._seopress_pro_rich_snippets_service_name ? proSchema._seopress_pro_rich_snippets_service_name : 'noServiceName'}`
                } else {
                    return ''
                }

                return (
                    <ProSchemasManual key={key} schema={proSchema} />
                );
            }): null
        }

        {/* Opengraph Metas Ref: https://ogp.me */}
        {siteSEO.wp.seoPressSettings.social.facebookOg ?
            <>
                <meta property="og:title" content={title} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={postOrPage.seo.canonicalUrl ? postOrPage.seo.canonicalUrl : props} />
                <meta property="og:description" content={postOrPage.seo.metaDesc ? postOrPage.seo.metaDesc : ''} />
                {siteSEO.wp.seoPressSettings.social.facebookImg.localFile.childImageSharp.gatsbyImageData.images.fallback.src ?
                    <meta property="og:image" content={siteSEO.site.siteMetadata.siteUrl + siteSEO.wp.seoPressSettings.social.facebookImg.localFile.childImageSharp.gatsbyImageData.images.fallback.src} />
                    : null
                }
                <meta property="og:image:alt" content="Plumb-All Logo" />
                <meta property="og:image:width" content={siteSEO.wp.seoPressSettings.social.facebookImg.localFile.childImageSharp.gatsbyImageData.width} />
                <meta property="og:image:height" content={siteSEO.wp.seoPressSettings.social.facebookImg.localFile.childImageSharp.gatsbyImageData.height} />
                {siteSEO.wp.seoPressSettings.social.facebookLinkOwnershipId ?
                    <meta property="fb:pages" content={siteSEO.wp.seoPressSettings.social.facebookLinkOwnershipId}/>
                    : null
                }
            </>
            :
            null
        }

        {/* Twitter Card Metas Ref: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup */}
        {siteSEO.wp.seoPressSettings.social.twitterCard ?
            <>
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:site" content="@PlumbAll" />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={postOrPage.seo.metaDesc ? postOrPage.seo.metaDesc : ''} />
                {siteSEO.wp.seoPressSettings.social.twitterCardImg.localFile.childImageSharp.gatsbyImageData.images.fallback.src ?
                    <meta property="twitter:image" content={siteSEO.site.siteMetadata.siteUrl + siteSEO.wp.seoPressSettings.social.twitterCardImg.localFile.childImageSharp.gatsbyImageData.images.fallback.src} />
                    : null
                }
                <meta property="twitter:image:alt" content="Plumb-All Logo" />
            </>
            : null
        }

        {/* Structured Data */}
        <Script type="application/ld+json">
            {`
{
"@context": "https://schema.org",
"@type": "${siteSEO.wp.seoPressSettings.pro.localBusinessType}",
"@id": "${siteSEO.wp.seoPressSettings.pro.localBusinessUrl}",
"name": "${siteSEO.wp.seoPressSettings.social.knowledgeName}",
"description": "Plumb-All: Best 24-Hour Plumbing and Septic Specialists",
"url": "${siteSEO.wp.seoPressSettings.pro.localBusinessUrl}",
"telephone": "${siteSEO.wp.seoPressSettings.pro.localBusinessPhone}",
${siteSEO.wp.seoPressSettings.pro.localBusinessPriceRange ?
    `
"priceRange": "${siteSEO.wp.seoPressSettings.pro.localBusinessPriceRange}",
    `
    : null
}
"image": "${siteSEO.site.siteMetadata.siteUrl + siteSEO.wp.seoPressSettings.social.knowledgeImg.localFile.childImageSharp.gatsbyImageData.images.fallback.src}",
${siteSEO.wp.seoPressSettings.pro.localBusinessLongitude && siteSEO.wp.seoPressSettings.pro.localBusinessLatitude ?
    `
"geo": {
    "@type": "GeoCoordinates",
    "latitude": "${siteSEO.wp.seoPressSettings.pro.localBusinessLatitude}",
    "longitude": "${siteSEO.wp.seoPressSettings.pro.localBusinessLongitude}"
},
    `
    : null
}

${siteSEO.wp.seoPressSettings.pro.localBusinessStreetAddress &&
  siteSEO.wp.seoPressSettings.pro.localBusinessCity &&
  siteSEO.wp.seoPressSettings.pro.localBusinessState &&
  siteSEO.wp.seoPressSettings.pro.localBusinessPostalCode &&
  siteSEO.wp.seoPressSettings.pro.localBusinessCountry ?
    `
"address": {
    "@type": "PostalAddress",
    "streetAddress": "${siteSEO.wp.seoPressSettings.pro.localBusinessStreetAddress}",
    "addressLocality": "${siteSEO.wp.seoPressSettings.pro.localBusinessCity}",
    "addressRegion": "${siteSEO.wp.seoPressSettings.pro.localBusinessState}",
    "postalCode": "${siteSEO.wp.seoPressSettings.pro.localBusinessPostalCode}",
    "addressCountry": "${siteSEO.wp.seoPressSettings.pro.localBusinessCountry}"
},
    `
    : null
}
"aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "159"
}
}
                `}
        </Script>
        <Script type="application/ld+json">
            {`
{
"@context": "https://schema.org",
"@type": "${siteSEO.wp.seoPressSettings.social.knowledgeType}",
"url": "${siteSEO.wp.seoPressSettings.pro.localBusinessUrl}",
"logo": "${siteSEO.site.siteMetadata.siteUrl + siteSEO.wp.seoPressSettings.social.knowledgeImg.localFile.childImageSharp.gatsbyImageData.images.fallback.src}"
}
            `}
        </Script>
    </>;
}

export default SEOPress
