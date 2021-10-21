import React, {useEffect} from "react"
import {useStaticQuery, graphql} from "gatsby"
import Menu from "./template-parts/Menu";
import Footer from "./template-parts/Footer";
import {Helmet} from "react-helmet";
import SEOPress from "./seo/SEOPress";

const Layout = ({ isHomePage, children, pageName, id, postOrPage, props }) => {
    const {
        wp: {
            generalSettings: { title },
        },
    } = useStaticQuery(graphql`
        query LayoutQuery {
            wp {
                generalSettings {
                    title
                    description
                }
            }
        }
    `)

    // INITIALIZE GOOGLE OPTIMIZE EXPERIMENT ON 'optimize.activate'
    useEffect(() => {
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({ event: 'optimize.activate' })
    }, [])

    return (
        <div className="global-wrapper" data-is-root-path={isHomePage}>

            <Menu />

            {isHomePage ?
                <div className="page-container" dangerouslySetInnerHTML={{__html: children}}/> :
                <div className="page-container">{children}</div>
            }

            <Footer />

            <Helmet>
                <link key="fontawesome" rel="stylesheet" href="https://unpkg.com/@fortawesome/fontawesome-free@5.15.4/css/all.css" crossOrigin="anonymous" />
            </Helmet>

            <SEOPress props={props} postOrPage={postOrPage} title={`${title}${pageName ? ' - ' + pageName : ''}`} />
        </div>
    )
}

export default Layout
