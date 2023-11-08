import React from "react"
import { graphql, Script } from "gatsby"

import Layout from "../components/layout"
import SEOPress from "../components/seo/SEOPress";

const PageTemplate = ({ data: { post: page }, location }) => {
    return (
        <Layout isHomePage id={page.id} postOrPage={page} props={`https://plumb-all.com${location.pathname}`}>
            {page.content}
        </Layout>
    )
}

export default PageTemplate

export const Head = ({location, data}) => (
    <>
        <SEOPress props={`https://plumb-all.com${location.pathname}`} postOrPage={data.post} />
        <Script
            key="recaptcha-submitter"
            strategy="post-hydrate"
            src="/js/contact-form-submit.js"
        />
        <Script
            key="recaptcha"
            src="https://www.google.com/recaptcha/api.js?render=6LduBK0UAAAAAGHy00BaEEo_I-I78xmEhGL6xBpW" />
    </>
)

export const pageQuery = graphql`query HomePage {
    post: wpPage(isFrontPage: {eq: true}) {
        id
        content
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
