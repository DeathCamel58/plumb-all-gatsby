import React from "react"
import Menu from "./template-parts/Menu";
import Footer from "./template-parts/Footer";

const Layout = ({ isHomePage, children }) => {
    // INITIALIZE GOOGLE OPTIMIZE EXPERIMENT ON 'optimize.activate'
    // useEffect(() => {
    //     window.dataLayer = window.dataLayer || []
    //     window.dataLayer.push({ event: 'optimize.activate' })
    // }, [])

    return (
        <div className="global-wrapper" data-is-root-path={isHomePage}>

            <Menu />

            {isHomePage ?
                <div className="page-container" dangerouslySetInnerHTML={{__html: children}}/> :
                <div className="page-container">{children}</div>
            }

            <Footer />
        </div>
    )
}

export default Layout
