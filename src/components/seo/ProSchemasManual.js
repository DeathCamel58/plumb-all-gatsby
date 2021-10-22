/**
 * Seo component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import {graphql, useStaticQuery} from "gatsby"
import {Helmet} from "react-helmet";

const ProSchemasManual = ({ schema }) => {
    const data = useStaticQuery(graphql`query proSchemas {
  allWpMediaItem {
    nodes {
      sourceUrl
      srcSet
      localFile {
        publicURL
      }
    }
  }
  site {
    siteMetadata {
      siteUrl
    }
  }
}
`)

    const matchedImage = function(url) {
        for (const i in data.allWpMediaItem.nodes) {
            let image = data.allWpMediaItem.nodes[i];
            if (image.srcSet) {
                if (image.srcSet.includes(url) || image.sourceUrl === url) {
                    return image;
                }
            }
        }
        return null;
    }

    let parsedSchema = ``
    let key = ``
    let image = matchedImage(schema._seopress_pro_rich_snippets_service_img)

    if (schema._seopress_pro_rich_snippets_type === 'services') {
        parsedSchema =
            `{
"@context": "https://schema.org/",
"@type": "Service",
"@id": "${schema.canonicalUrl ? schema.canonicalUrl : ''}",
"name": "${schema._seopress_pro_rich_snippets_service_name ? schema._seopress_pro_rich_snippets_service_name : ''}",
"serviceType": "${schema._seopress_pro_rich_snippets_service_type ? schema._seopress_pro_rich_snippets_service_type : ''}",
"description": "${schema._seopress_pro_rich_snippets_service_description ? schema._seopress_pro_rich_snippets_service_description : ''}",
${schema._seopress_pro_rich_snippets_service_img ?
    `
"image": "${schema._seopress_pro_rich_snippets_service_img ? image ? data.site.siteMetadata.siteUrl + image.localFile.publicURL : schema._seopress_pro_rich_snippets_service_img : ""}",
    `
    : null
}
"areaServed": "${schema._seopress_pro_rich_snippets_service_area ? schema._seopress_pro_rich_snippets_service_area : ''}",
"providerMobility": "${schema._seopress_pro_rich_snippets_service_provider_mobility ? schema._seopress_pro_rich_snippets_service_provider_mobility : ''}",
"provider": {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "image": "${schema._seopress_pro_rich_snippets_service_img ? schema._seopress_pro_rich_snippets_service_img : ''}",
    "name": "${schema._seopress_pro_rich_snippets_service_provider_name ? schema._seopress_pro_rich_snippets_service_provider_name : ''}",
    "telephone": "${schema._seopress_pro_rich_snippets_service_tel ? schema._seopress_pro_rich_snippets_service_tel : ''}"
    }
}`
        key = `service-${schema._seopress_pro_rich_snippets_service_type ? schema._seopress_pro_rich_snippets_service_type : 'noServiceType'}-${schema._seopress_pro_rich_snippets_service_name ? schema._seopress_pro_rich_snippets_service_name : 'noServiceName'}`
    } else {
        return ''
    }

    return (
        <>
            <Helmet>
                {/* Insert Pro Schemas */}
                <script type="application/ld+json" key={key}>
                    {parsedSchema}
                </script>
            </Helmet>
        </>
    )
}

export default ProSchemasManual
