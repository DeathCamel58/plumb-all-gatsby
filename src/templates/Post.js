import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
// these are copied into this project due to a conflict in the postCSS
// version used by the Gatsby and @wordpress packages that causes build
// failures.
// @todo update this once @wordpress upgrades their postcss version
// import "../css/@wordpress/block-library/build-style/style.scss"
// import "../css/@wordpress/block-library/build-style/theme.css"

// import Bio from "../components/bio"
import Layout from "../components/layout"
// import Seo from "../components/seo"

const BlogPostTemplate = ({ data: { previous, next, post } }) => {
    const featuredImage = {
        fluid: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
        alt: post.featuredImage?.node?.alt || ``,
    }

    return (
        <Layout pageName={post.title}>
            <article
                className="blog-post not-front-page"
                itemScope
                itemType="http://schema.org/Article"
            >
                <header>
                    <h1 itemProp="headline">{parse(post.title)}</h1>

                    <p>{post.date}</p>

                    {/* if we have a featured image for this post let's display it */}
                    {featuredImage?.fluid && (
                        <GatsbyImage
                            image={featuredImage.gatsbyImageData}
                            alt={featuredImage.alt}
                            style={{ marginBottom: 50 }} />
                    )}
                </header>

                {!!post.content && (
                    <section itemProp="articleBody">{parse(post.content)}</section>
                )}
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
                        gatsbyImageData(quality: 100, placeholder: TRACED_SVG, layout: FULL_WIDTH)
                    }
                }
            }
        }
    }
}
`
