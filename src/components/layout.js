import React from "react"
import {useStaticQuery, graphql, Link} from "gatsby"
import Menu from "./template-parts/Menu";
import Footer from "./template-parts/Footer";
import {Helmet} from "react-helmet";
import {GatsbyImage} from "gatsby-plugin-image";

const Layout = ({ isHomePage, children, pageName }) => {
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

    return (
        <div className="global-wrapper" data-is-root-path={isHomePage}>
            {console.log(children)}

            <Menu></Menu>

            {console.log(isHomePage)}

            {console.log(pageName)}

            {isHomePage ?
                <div className="page-container" dangerouslySetInnerHTML={{__html: children}}/> :
                <div className="page-container">{children}</div>
            }

            <Footer></Footer>

            <Helmet>
                <title>{title}{pageName ? ` - ${pageName}` :``}</title>
                <link key="fontawesome" rel="stylesheet" href="	https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.5.0/css/all.css" crossOrigin="anonymous" />
            </Helmet>
        </div>
    )
}

export default Layout
