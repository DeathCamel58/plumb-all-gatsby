import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"

const PageTemplate = (location) => {
    const HomePage = useStaticQuery(graphql`
        query HomePage {
            wpPage(isFrontPage: {eq: true}) {
                id
                content
                seo {
                    canonicalUrl
                    hasProLicense
                    metaDesc
                    metaNewsDisabled
                    metaRobotsArchive
                    metaRobotsImageIndex
                    metaRobotsBreadcrumbs
                    metaRobotsNofollow
                    metaRobotsNoindex
                    metaRobotsOdp
                    metaRobotsPrimaryCategory
                    metaRobotsSnippet
                    metaTitle
                    metaVideo
                    metaVideoDisabled
                    opengraphDescription
                    opengraphTitle
                    opengraphImage {
                        altText
                    }
                    proSchemas
                    proSchemasManual
                    redirectionsEnabled
                    redirectionsType
                    redirectionsURL
                    targetKeywords
                    twitterDescription
                    twitterTitle
                    twitterImage {
                        id
                    }
                }
            }
        }
    `)

    return (
        <Layout isHomePage id={HomePage.wpPage.id} postOrPage={HomePage.wpPage} props={`https://plumb-all.com${location.pathname}`}>
            {HomePage.wpPage.content}
        </Layout>
    )
}

export default PageTemplate
