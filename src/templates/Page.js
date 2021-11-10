import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
// import "../css/@wordpress/block-library/build-style/style.scss"
// import "../css/@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"

const BlogPageTemplate = ({ data: { post: page }, location }) => {
    const featuredImage = {
        fluid: page.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
        alt: page.featuredImage?.node?.alt || ``,
    }

    return (
        <Layout pageName={page.title} id={page.id} postOrPage={page} props={`https://plumb-all.com${location.pathname}`}>
            <header>
                {/* if we have a featured image for this post let's display it */}
                {featuredImage?.fluid && (
                    <GatsbyImage
                        image={featuredImage.fluid}
                        alt={featuredImage.alt}
                        style={{ marginBottom: 50 }}
                        loading="eager"
                        className="toprow"
                    />
                )}
            </header>

            {!!page.content && (
                page.title === "Home" ?
                    <section className="" itemProp="articleBody">{parse(page.content)}</section>:
                    <section className="not-front-page" itemProp="articleBody">{parse(page.content)}</section>
            )}
        </Layout>
    );
}

export default BlogPageTemplate

export const pageQuery = graphql`query BlogPageById($id: String!) {
    post: wpPage(id: {eq: $id}) {
        id
        content
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
            node {
                altText
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            quality: 100
                            placeholder: BLURRED
                            layout: FULL_WIDTH
                        )
                    }
                }
            }
        }
        seo {
            canonicalUrl
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
`
