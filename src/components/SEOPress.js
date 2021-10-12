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
    const post = useStaticQuery(graphql`
        query page {
            wp {
                generalSettings {
                    title
                    description
                    url
                }
            }
        }`
    )

    const site = post.wp.generalSettings

    if (postOrPage === '404') {
        return (
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={`404 - This page does not exist.`} />
            </Helmet>
        )
    }

    // console.log(seo)

    return (
        <Helmet>
            <meta http-equiv="Content-Type" content="en-us" />
            <title>{title}</title>
            <meta name="description" content={postOrPage.seo.metaDesc ? postOrPage.seo.metaDesc : ''} />
            <link rel="canonical" href={postOrPage.seo.canonicalUrl ? postOrPage.seo.canonicalUrl : props} />

            {/* Opengraph Metas Ref: https://ogp.me */}
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={postOrPage.seo.canonicalUrl ? postOrPage.seo.canonicalUrl : props} />
            <meta property="og:description" content={postOrPage.seo.metaDesc ? postOrPage.seo.metaDesc : ''} />
            <meta property="og:image" content="https://plumb-all.com/img/icon.png" />
            <meta property="og:image:alt" content="Plumb-All Logo" />
            <meta property="og:image:width" content="800" />
            <meta property="og:image:height" content="600" />

            {/* Twitter Card Metas Ref: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup */}
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:site" content="@PlumbAll" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={postOrPage.seo.metaDesc ? postOrPage.seo.metaDesc : ''} />
            <meta property="twitter:image" content="https://plumb-all.com/img/icon.png" />
            <meta property="twitter:image:alt" content="Plumb-All Logo" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {`
                    {
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "@id": "https://plumb-all.com/",
                        "name": "Plumb-All",
                        "description": "Plumb-All: Best 24-Hour Plumbing and Septic Specialists",
                        "url": "https://plumb-all.com/",
                        "telephone": "8447586225",
                        "priceRange": "$$",
                        "image": "https://plumb-all.com/img/icon.png",
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": "33.527213",
                            "longitude": "-84.354197"
                        },
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "218 N McDonough St",
                            "addressLocality": "Jonesboro",
                            "addressRegion": "GA",
                            "postalCode": "30236",
                            "addressCountry": "US"
                        },
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
                            "@type": "Organization",
                            "url": "https://plumb-all.com",
                            "logo": "https://plumb-all.com/img/icon.png"
                        }
                    `}
                </script>

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
                }):
                null
            }
            </Helmet>
    )
}

export default SEOPress
