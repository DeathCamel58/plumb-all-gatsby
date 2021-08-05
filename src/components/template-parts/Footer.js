import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import {Col, Container, Nav, Navbar, Row} from "react-bootstrap"

function makeMenuHTML(item) {
    let html = "<Col><Nav.Link href=\"" + item['url'] + "\" className=\"menu_item\">" + item['label'] + "</Nav.Link></Col>";
    return html;
}

const Footer = ({ isHomePage, children }) => {
    const FooterMenu = useStaticQuery(graphql`
        query FooterMenu {
            wpMenu(locations: {eq: PRIMARY}) {
                menuItems {
                    nodes {
                        url,
                        label
                    }
                }
            }
        }
    `)

    return (
        <Container fluid className={'footer'}>
            <Row>
                <Col xl={6} className="footer_l">
                    <Container fluid>
                        <Row className="footer_menu">
                            {
                                FooterMenu.wpMenu.menuItems.nodes.map((menuItem, i) => {
                                    const path = menuItem?.connectedNode?.node?.uri ?? menuItem.url

                                    return (
                                        <Col>
                                            <Link
                                                to={menuItem.url}
                                                className="menu_item footer_menu_item">
                                                {menuItem.label}
                                            </Link>
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <Row>
                            <Col>
                                <div className="estimation">
                                    <a className="button button-cyan button_big" href="tel:+18447586225">(844) PLUMB-ALL</a>
                                    <p className="text_color-lilac"> Tel:<a className="text_color-cyan" href="tel:+18447586225"> (844)
                                        758-6225</a><br />
                                        Email: <a className="text_color-cyan" href="mailto:info@plumb-all.com">info@plumb-all.com</a></p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col xl={6} className="footer_r">
                    <Container fluid>
                        <Row>
                            <Col>
                                <h5>Need Help Quickly?</h5>
                                <p className="text_color-lilac">
                                    With many plumbing crews out in the field, we can get to your location quickly, so that you can
                                    get your problem fixed ASAP.<br />
                                    We're located in Jonesboro, Georgia, so we're always nearby.<a href="/privacy-policy/">Privacy Policy</a>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            <p className="copyright text_color-lilac small">©2017-{new Date().getFullYear()} - Plumb-All LLC.</p>
        </Container>
    )
}

export default Footer
