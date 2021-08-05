import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Form } from 'react-bootstrap';

// We're using Gutenberg so we need the block styles
// import "@wordpress/block-library/build-style/style.css"
// import "@wordpress/block-library/build-style/theme.css"

// import Bio from "../components/bio"
import Layout from "../components/layout"
// import SEO from "../components/seo"

const PageTemplate = () => {
    const HomePage = useStaticQuery(graphql`
        query HomePage {
            wpPage(isFrontPage: {eq: true}) {
                content
            }
        }
    `)

    return (
        <Layout isHomePage>
            {HomePage.wpPage.content}
        </Layout>
    )
}

export default PageTemplate
