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

import Layout from "../components/layout"

const BlogPageTemplate = ({ data: { post: page } }) => {
    const featuredImage = {
        fluid: page.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
        alt: page.featuredImage?.node?.alt || ``,
    }

    return (
        <Layout pageName={page.title}>
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
                        gatsbyImageData(quality: 100, placeholder: TRACED_SVG, layout: FULL_WIDTH)
                    }
                }
            }
        }
    }
}
`
