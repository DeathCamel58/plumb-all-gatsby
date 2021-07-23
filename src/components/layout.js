import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Menu from "./template-parts/Menu";
import Footer from "./template-parts/Footer";
import {Helmet} from "react-helmet";

const Layout = ({ isHomePage, children }) => {
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
            <Menu></Menu>

            <div className="page-container" dangerouslySetInnerHTML={{__html: children}}></div>

            <Footer></Footer>

            <Helmet>
                <link key="fontawesome" rel="stylesheet" href="	https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.5.0/css/all.css" crossOrigin="anonymous" />
            </Helmet>
        </div>
    )
}

export default Layout
