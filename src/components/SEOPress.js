/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import {useStaticQuery, graphql} from "gatsby"
import {LocalBusinessJsonLd, LogoJsonLd} from "gatsby-plugin-next-seo";
import {GatsbySeo} from "gatsby-plugin-next-seo/src/meta/gatsby-seo";
import {Helmet} from "react-helmet";

const SEOPress = ({ postOrPage, props }) => {
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
        return null
    }

    // console.log(seo)

    return (
        <>
            <LocalBusinessJsonLd
                key='Local Business LD'
                type='LocalBusiness'
                id='https://plumb-all.com/'
                name={site.title}
                description={site.description}
                url='https://plumb-all.com/'
                telephone='8447586225'
                priceRange='$$'
                address={{
                    streetAddress: '218 N McDonough St',
                    addressLocality: 'Jonesboro',
                    addressRegion: 'GA',
                    postalCode: '30236',
                    addressCountry: 'US',
                }}
                geo={{
                    latitude: '33.527213',
                    longitude: '-84.354197',
                }}
                images='https://plumb-all.com/img/icon.png'
            />
            <LogoJsonLd
                logo='https://plumb-all.com/img/icon.png'
                url='https://plumb-all.com'
            />

            <Helmet>
                <meta name="description" content={postOrPage.seo.metaDesc ? postOrPage.seo.metaDesc : ''} />
                <meta http-equiv="Content-Type" content="en-us" />
            </Helmet>

            <GatsbySeo
                openGraph={{
                    type: 'website',
                    url: postOrPage.seo.canonicalUrl ? postOrPage.seo.canonicalUrl : props,
                    title: `${postOrPage.seo.metaTitle ? postOrPage.seo.metaTitle : postOrPage.title}`,
                    description: `${postOrPage.seo.metaDesc ? postOrPage.seo.metaDesc : ''}`,
                    images: [
                        {
                            url: 'https://plumb-all.com/img/icon.png',
                            width: 800,
                            height: 600,
                            alt: 'Plumb-All Logo',
                        },
                    ],
                }}
            />
            {postOrPage.seo.proSchemasManual && postOrPage.seo.proSchemasManual !== "\"\"" && postOrPage.seo.proSchemasManual !== "{\"_seopress_pro_rich_snippets_type\":\"none\"}"?
                <Helmet>
                    {JSON.parse(postOrPage.seo.proSchemasManual).map(proSchema => {
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
                    })}
                </Helmet>:
                null
            }
        </>
    )
}

export default SEOPress
