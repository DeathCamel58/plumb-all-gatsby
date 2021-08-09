/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import {useStaticQuery, graphql, Link} from "gatsby"
import {LocalBusinessJsonLd, LogoJsonLd} from "gatsby-plugin-next-seo";
import {GatsbySeo} from "gatsby-plugin-next-seo/src/meta/gatsby-seo";
import {Helmet} from "react-helmet";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import {GatsbyImage} from "gatsby-plugin-image";
import parse from "html-react-parser";
import Row from "react-bootstrap/Row";

const SEOPress = ({ id, postOrPage, props }) => {
    const post = useStaticQuery(graphql`
        query page($id: String) {
            page: wpPage(id: {eq: $id}) {
                id
                uri
            }
            wp {
                generalSettings {
                    title
                    description
                    url
                }
            }
        }`
    )

    const seo = post.page.seo
    const site = post.wp.generalSettings

    // console.log(seo)
    const proSchemasManual = JSON.parse(postOrPage.seo.proSchemasManual)
    const proSchemas = JSON.parse(postOrPage.seo.proSchemas)

    return (
        <>
            <LocalBusinessJsonLd
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
                images='https://plumb-all.com/wp-content/uploads/2018/08/icon.png'
            />
            <LogoJsonLd
                logo='https://plumb-all.com/wp-content/uploads/2018/08/icon.png'
                url='https://plumb-all.com'
            />
            <GatsbySeo
                openGraph={{
                    type: 'website',
                    url: `${postOrPage.seo.canonicalUrl}`,
                    title: `${postOrPage.seo.metaTitle ? postOrPage.seo.metaTitle : postOrPage.title}`,
                    description: `${postOrPage.seo.metaDesc ? postOrPage.seo.metaDesc : ''}`,
                    images: [
                        {
                            url: 'https://www.example.ie/og-image-2.jpg',
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt',
                        },
                    ],
                }}
            />
            <Helmet>
                {proSchemasManual.map(proSchema => {
                    let schema = ``

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
                    } else {
                        return ''
                    }

                    return (
                        <script type="application/ld+json">
                            {schema}
                        </script>
                    );
                })}
            </Helmet>
        </>
    )
}

SEOPress.propTypes = {
    id: PropTypes.string.isRequired,
}

export default SEOPress
