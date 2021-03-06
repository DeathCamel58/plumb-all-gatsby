import React from "react"
import {Link, graphql} from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
// import Seo from "../components/seo"
import Card from "react-bootstrap/Card"
import { GatsbyImage } from "gatsby-plugin-image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Container} from "react-bootstrap";
import {Helmet} from "react-helmet";

const BlogIndex = ({
                       data,
                       pageContext: {nextPagePath, previousPagePath},
                   }) => {
    const posts = data.allWpPost.nodes

    // Statically define postOrPage to allow the SEO stuff to work
    const postOrPage = {
        id: "N/A",
        title: "News",
        content: "NEWS",
        seo: {
            metaDesc: "Here at Plumb-All, we take great pride in educating the public about some plumbing basics. We hope that these blog posts are helpful and informative."
        }
    }

    if (!posts.length) {
        return (
            <Layout pageName="Blog" postOrPage={postOrPage} props={`https://plumb-all.com/news/`}>
                <Row>
                    <Col>
                        <p>
                            No blog posts found. Add posts to your WordPress site and they'll
                            appear here!
                        </p>
                        <Link to="/news/">
                            View our posts!
                        </Link>
                    </Col>
                </Row>
            </Layout>
        )
    }

    return (
        <Layout pageName="Blog" postOrPage={postOrPage} props={`https://plumb-all.com/news/`}>
            <Container className="not-front-page">
                <Row>
                    <Col>
                        <h1 className="has-text-align-center">
                            Our Recent Posts
                        </h1>
                        <p>
                            We take great pride in educating the public about some plumbing basics. We hope that these are helpful and informative.
                        </p>
                    </Col>
                </Row>
                <Row data-masonry='{"percentPosition": true }'>
                    {posts.map(post => {
                        const title = post.title

                        return (
                            <Col sm={6}>
                                <Card key={post.url} className="article-card">
                                    {/* if we have a featured image for this post let's display it */}
                                    {post.featuredImage ?
                                        <Link to={post.uri}>
                                            <GatsbyImage
                                                image={post.featuredImage.node.localFile.childImageSharp.gatsbyImageData}
                                                alt={post.featuredImage.node.alt ? post.featuredImage.node.alt : "Post Image"}
                                                className="card-img-top" />
                                        </Link>
                                        :null
                                    }
                                    <div className="card-body">
                                        <Link to={post.uri} className="no-underline-link">
                                            <h5 className="card-title">{parse(title)}</h5>
                                        </Link>
                                        {parse(post.excerpt)}
                                    </div>
                                    <div className="card-footer">
                                        <Row>
                                            <Col>{post.date}</Col>
                                        </Row>
                                    </div>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>

            {previousPagePath && (
                <>
                    <Link to={previousPagePath}>Previous page</Link>
                    <br/>
                </>
            )}
            {nextPagePath && <Link to={nextPagePath}>Next page</Link>}

            <Helmet>
                <script
                    src="https://unpkg.com/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"
                    integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D"
                    crossOrigin="anonymous" async
                />
            </Helmet>
        </Layout>
    );
}

export default BlogIndex

export const pageQuery = graphql`query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
        sort: {fields: [date], order: DESC}
        limit: $postsPerPage
        skip: $offset
    ) {
        nodes {
            excerpt
            uri
            date(formatString: "MMMM DD, YYYY")
            author {
                node {
                    name
                }
            }
            title
            excerpt
            featuredImage {
                node {
                    altText
                    localFile {
                        childImageSharp {
                            gatsbyImageData(
                                quality: 100
                                placeholder: BLURRED
                                layout: CONSTRAINED
                                formats: [AUTO, WEBP, AVIF]
                                blurredOptions: {width: 100}
                                width: 590
                            )
                        }
                    }
                }
            }
        }
    }
}
`
