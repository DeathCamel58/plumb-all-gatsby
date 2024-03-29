import React, { useEffect, useRef, useState } from "react"
import { Link, graphql, Script } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import { GatsbyImage } from "gatsby-plugin-image";
import { Container, Row, Col, Card } from "react-bootstrap";
import SEOPress from "../components/seo/SEOPress";

// Statically define postOrPage to allow the SEO stuff to work
const postOrPage = {
    id: "N/A",
    title: "News",
    content: "NEWS",
    seo: {
        metaDesc: "Here at Plumb-All, we take great pride in educating the public about some plumbing basics. We hope that these blog posts are helpful and informative."
    }
}

const BlogIndex = ({
                       data,
                       pageContext: {nextPagePath, previousPagePath},
                   }) => {
    const posts = data.allWpPost.nodes

    // Stuff for the masonry layout
    const masonryRef = useRef(null);
    const [masonryRender, setMasonryRender] = useState(true);
    useEffect(() => {
        // import('masonry-layout').then((module) => {
        //     // Use the package here
        //     const package = module.default;
        //     console.log('Package imported:', package);
        // });
        //
        // let masonry = new Masonry(masonryRef.current, {
        //     itemSelector: '.masonry-item',
        // });
        //
        // masonry.layout();
        //
        // setMasonryRender(false);
        //
        // return () => {
        //     masonry.destroy();
        // };
    }, [masonryRender]);

    if (!posts.length) {
        return (
            <Layout>
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
        <Layout>
            <Container className="not-front-page">
                <Row>
                    <Col>
                        <h1 className="has-text-align-center">
                            Our Recent Posts
                        </h1>
                        <p>
                            At Plumb-All, we're dedicated to keeping your plumbing in top shape, ensuring you can enjoy a smoothly functioning home. Water pressure matters, and we're here to help you understand its importance. Explore our latest blog posts to uncover valuable insights into maintaining your plumbing system. From addressing low water pressure to handling unexpected issues, we're your go-to source for expert advice and solutions. With over two decades of experience, Plumb-All is your trusted partner for all your plumbing and septic needs in Jonesboro, GA.
                        </p>
                    </Col>
                </Row>
                <Row className="grid" ref={masonryRef}>
                    {posts.map(post => (
                        <Col className="masonry-item" key={post.uri} sm={6}>
                            <Card className="article-card">
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
                                        <h5 className="card-title">{parse(post.title)}</h5>
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
                    ))}
                </Row>

                {previousPagePath != null|| nextPagePath != null ?
                    <Row>
                        <nav className="pagination justify-content-center" aria-label="Pagination">
                            {previousPagePath &&
                                <li className="page-item" key="previous-page">
                                    <Link className="page-link" to={previousPagePath}>Previous page</Link>
                                </li>
                            }
                            {nextPagePath &&
                                <li className="page-item" key="next-page">
                                    <Link className="page-link" to={nextPagePath}>Next page</Link>
                                </li>
                            }
                        </nav>
                    </Row>
                    : null
                }

            </Container>
        </Layout>
    );
}

export default BlogIndex

export const Head = ({location, data}) => (
    <SEOPress props={`https://plumb-all.com${location.pathname}`} postOrPage={postOrPage} />
)

export const pageQuery = graphql`query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
        sort: {date: DESC}
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
