import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Container } from "react-bootstrap"

const Footer = ({ isHomePage, children }) => {
    /*
    const FooterMenu = useStaticQuery(graphql`
        query PrimaryMenu {
            wpMenu(locations: {eq: PRIMARY}) {
                menuItems {
                    nodes {
                        id,
                        url,
                        label
                    }
                }
            }
        }
    `)
    */

    return (
        <Container fluid className={'footer'}>
            <div className="footer_l">
                <nav className="menu_item menu" id="menu-navigation-menu-1">
                    <a id=""
                       className="menu-item menu-item-type-post_type menu-item-object-page menu-item-595"
                       href="https://plumb-all.com/jonesboro-plumbers/about-our-process/">About Us</a>
                    <a id="" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-596"
                       href="https://plumb-all.com/contact/">Contact</a>
                    <a id="" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1361"
                       href="https://plumb-all.com/financing/">Financing</a>
                    <a id="" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-597"
                       href="https://plumb-all.com/services/">Services</a>
                </nav>
            </div>
            <div className="footer_r">
                <div className="text">
                    <h5>Need Help Quickly?</h5>
                    <p className="text_color-lilac">
                        With many plumbing crews out in the field, we can get to your location quickly, so that you can
                        get your problem fixed ASAP.<br />
                        We're located in Jonesboro, Georgia, so we're always nearby.<a href="/privacy-policy/">Privacy Policy</a>
                    </p>
                </div>
                <div className="estimation">
                    <a className="button button-cyan button_big" href="tel:+18447586225">(844) PLUMB-ALL</a>
                    <p className="text_color-lilac"> Tel:<a className="text_color-cyan" href="tel:+18447586225"> (844)
                        758-6225</a><br />
                        Email: <a className="text_color-cyan" href="mailto:info@plumb-all.com">info@plumb-all.com</a></p>
                </div>
            </div>
            <p className="copyright text_color-lilac small">©2017-{new Date().getFullYear()} - Plumb-All LLC.</p>
        </Container>
    )
}

export default Footer
