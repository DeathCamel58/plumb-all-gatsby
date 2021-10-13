/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import {useStaticQuery, graphql} from "gatsby"
import {Helmet} from "react-helmet";

const SEOPress = ({ postOrPage, props, title }) => {
    const siteSEO = useStaticQuery(graphql`
        query SEO {
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
                        facebookImg
                        facebookImgMedia {
                            nodes {
                                localFile {
                                    childImageSharp {
                                        id
                                        fixed {
                                            height
                                            width
                                            src
                                        }
                                    }
                                }
                            }
                        }
                        facebookImgDefault
                        facebookLinkOwnershipId
                        facebookOg
                        knowledgeContactOption
                        knowledgeContactType
                        knowledgeImg
                        knowledgeImgMedia {
                            nodes {
                                localFile {
                                    childImageSharp {
                                        id
                                        fixed {
                                            height
                                            width
                                            src
                                        }
                                    }
                                }
                            }
                        }
                        knowledgeName
                        knowledgePhone
                        knowledgeType
                        twitterCard
                        twitterCardImg
                        twitterCardImgMedia {
                            nodes {
                                localFile {
                                    childImageSharp {
                                        id
                                        fixed {
                                            height
                                            width
                                            src
                                        }
                                    }
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
        }`
    )

    if (postOrPage === '404') {
        return (
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={`404 - This page does not exist.`} />
            </Helmet>
        )
    }

    return (
        <>
            <Helmet>
                <meta http-equiv="Content-Type" content="en-us" />
                <title>{title}</title>
                <meta name="description" content={postOrPage.seo.metaDesc ? postOrPage.seo.metaDesc : ''} />
                <link rel="canonical" href={postOrPage.seo.canonicalUrl ? postOrPage.seo.canonicalUrl : props} />

                {/* Insert Pro Schemas */}
                {postOrPage.seo.proSchemasManual && postOrPage.seo.proSchemasManual !== "\"\"" && postOrPage.seo.proSchemasManual !== "[{\"_seopress_pro_rich_snippets_type\":\"none\"}]"?
                    JSON.parse(postOrPage.seo.proSchemasManual).map(proSchema => {
                        let schema = ``
                        let key = ``

                        if (proSchema._seopress_pro_rich_snippets_type === 'services') {
                            schema =
                                `{
    "@context": "https://schema.org/",
    "@type": "Service",
    "@id": "${proSchema.canonicalUrl ? proSchema.canonicalUrl : ''}",
    "name": "${proSchema._seopress_pro_rich_snippets_service_name ? proSchema._seopress_pro_rich_snippets_service_name : ''}",
    "serviceType": "${proSchema._seopress_pro_rich_snippets_service_type ? proSchema._seopress_pro_rich_snippets_service_type : ''}",
    "description": "${proSchema._seopress_pro_rich_snippets_service_description ? proSchema._seopress_pro_rich_snippets_service_description : ''}",
    "image": "${proSchema._seopress_pro_rich_snippets_service_img ? proSchema._seopress_pro_rich_snippets_service_img : ''}",
    "areaServed": "${proSchema._seopress_pro_rich_snippets_service_area ? proSchema._seopress_pro_rich_snippets_service_area : ''}",
    "providerMobility": "${proSchema._seopress_pro_rich_snippets_service_provider_mobility ? proSchema._seopress_pro_rich_snippets_service_provider_mobility : ''}",
    "provider": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "image": "${proSchema._seopress_pro_rich_snippets_service_img ? proSchema._seopress_pro_rich_snippets_service_img : ''}",
    "name": "${proSchema._seopress_pro_rich_snippets_service_provider_name ? proSchema._seopress_pro_rich_snippets_service_provider_name : ''}",
    "telephone": "${proSchema._seopress_pro_rich_snippets_service_tel ? proSchema._seopress_pro_rich_snippets_service_tel : ''}"
    }
    }`
                            key = `service-${proSchema._seopress_pro_rich_snippets_service_type ? proSchema._seopress_pro_rich_snippets_service_type : 'noServiceType'}-${proSchema._seopress_pro_rich_snippets_service_name ? proSchema._seopress_pro_rich_snippets_service_name : 'noServiceName'}`
                        } else {
                            return ''
                        }

                        return (
                            <script type="application/ld+json" key={key}>
                                {schema}
                            </script>
                        );
                    }): null
                }
                </Helmet>

            {/* Opengraph Metas Ref: https://ogp.me */}
            {siteSEO.wp.seoPressSettings.social.facebookOg ?
                <Helmet>
                    <meta property="og:title" content={title} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={postOrPage.seo.canonicalUrl ? postOrPage.seo.canonicalUrl : props} />
                    <meta property="og:description" content={postOrPage.seo.metaDesc ? postOrPage.seo.metaDesc : ''} />
                    <meta property="og:image" content={siteSEO.site.siteMetadata.siteUrl + siteSEO.wp.seoPressSettings.social.facebookImgMedia.nodes[0].localFile.childImageSharp.fixed.src} />
                    <meta property="og:image:alt" content="Plumb-All Logo" />
                    <meta property="og:image:width" content={siteSEO.wp.seoPressSettings.social.facebookImgMedia.nodes[0].localFile.childImageSharp.fixed.width} />
                    <meta property="og:image:height" content={siteSEO.wp.seoPressSettings.social.facebookImgMedia.nodes[0].localFile.childImageSharp.fixed.height} />
                    {siteSEO.wp.seoPressSettings.social.facebookLinkOwnershipId ?
                        <meta property="fb:pages" content={siteSEO.wp.seoPressSettings.social.facebookLinkOwnershipId}/>
                        : null
                    }
                </Helmet>
                :
                null
            }

            {/* Twitter Card Metas Ref: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup */}
            {siteSEO.wp.seoPressSettings.social.twitterCard ?
                <Helmet>
                    <meta property="twitter:card" content="summary" />
                    <meta property="twitter:site" content="@PlumbAll" />
                    <meta property="twitter:title" content={title} />
                    <meta property="twitter:description" content={postOrPage.seo.metaDesc ? postOrPage.seo.metaDesc : ''} />
                    <meta property="twitter:image" content={siteSEO.site.siteMetadata.siteUrl + siteSEO.wp.seoPressSettings.social.twitterCardImgMedia.nodes[0].localFile.childImageSharp.fixed.src} />
                    <meta property="twitter:image:alt" content="Plumb-All Logo" />
                </Helmet>
                : null
            }

            {/* Structured Data */}
            <Helmet>
                <script type="application/ld+json">
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
                                "image": "${siteSEO.site.siteMetadata.siteUrl + siteSEO.wp.seoPressSettings.social.knowledgeImgMedia.nodes[0].localFile.childImageSharp.fixed.src}",
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
                </script>
                <script type="application/ld+json">
                    {`
                        {
                            "@context": "https://schema.org",
                            "@type": "${siteSEO.wp.seoPressSettings.social.knowledgeType}",
                            "url": "${siteSEO.wp.seoPressSettings.pro.localBusinessUrl}",
                            "logo": "${siteSEO.site.siteMetadata.siteUrl + siteSEO.wp.seoPressSettings.social.knowledgeImgMedia.nodes[0].localFile.childImageSharp.fixed.src}"
                        }
                    `}
                </script>
            </Helmet>
        </>
    )
}

export default SEOPress
