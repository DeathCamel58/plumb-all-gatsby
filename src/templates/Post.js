import React from "react"
import { graphql, Link } from "gatsby"
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
import { Container, Col, Row } from "react-bootstrap";
import SEOPress from "../components/seo/SEOPress";

const BlogPostTemplate = ({ data: { previous, next, post }, location }) => {
    const featuredImage = {
        fluid: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
        alt: post.featuredImage?.node?.alt || ``,
    }

    return (
        <Layout>
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

                <Container>
                    <Row>
                        <Col>
                            <Link to="/news/">Back to the Blog</Link>
                        </Col>
                        <Col>
                            <p className="text-end">Posted on {post.date}</p>
                        </Col>
                    </Row>
                </Container>

            </article>
        </Layout>
    );
}

export default BlogPostTemplate

export const Head = ({location, data}) => (
    <SEOPress props={`https://plumb-all.com${location.pathname}`} postOrPage={data.post} />
)

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
