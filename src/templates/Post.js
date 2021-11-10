import React from "react"
import {graphql, Link} from "gatsby"
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
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Seo from "../components/seo"

const BlogPostTemplate = ({ data: { previous, next, post }, location }) => {
    const featuredImage = {
        fluid: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
        alt: post.featuredImage?.node?.alt || ``,
    }

    return (
        <Layout pageName={post.title} id={post.id} postOrPage={post} props={`https://plumb-all.com${location.pathname}`}>
            {/* if we have a featured image for this post let's display it */}
            {featuredImage?.fluid && (
                <header>
                    <GatsbyImage
                        image={post.featuredImage.node.localFile.childImageSharp.gatsbyImageData}
                        alt={post.featuredImage.node.altText}
                        style={{ marginBottom: 50 }}
                        loading="eager"
                        className="toprow"/>
                </header>
            )}
            <article
                className="blog-post not-front-page"
                itemScope
                itemType="http://schema.org/Article"
            >

                {!!post.content && (
                    <section itemProp="articleBody">{parse(post.content)}</section>
                )}

                <Row>
                    <Col>
                        <Link to="/news/">Back to the Blog</Link>
                    </Col>
                    <Col>
                        <p className="text-end">Posted on {post.date}</p>
                    </Col>
                </Row>

            </article>
        </Layout>
    );
}

export default BlogPostTemplate

export const pageQuery = graphql`query BlogPostById($id: String!) {
    post: wpPost(id: {eq: $id}) {
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
                            width: 1920
                            height: 400
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
