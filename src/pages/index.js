import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Form } from 'react-bootstrap';

// We're using Gutenberg so we need the block styles
// import "@wordpress/block-library/build-style/style.css"
// import "@wordpress/block-library/build-style/theme.css"

// import Bio from "../components/bio"
import Layout from "../components/layout"
// import SEO from "../components/seo"

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
