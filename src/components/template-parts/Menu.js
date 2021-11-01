import React from "react"
import {Link, useStaticQuery, graphql} from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Menu = ({ isHomePage, children }) => {
    const wpMenu = useStaticQuery(graphql`
        query PrimaryMenu {
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
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="sticky-top">
            <Container fluid className="header_lighten header_wrap">
                <Navbar.Brand href="/" className="logo_wrap">
                    <StaticImage
                        src="https://wp.plumb-all.com/wp-content/uploads/2018/07/Plumb-All-Primary-Logo-resized.png.webp"
                        alt="Plumb-All Logo"
                        className="logo-img"
                        height={25}
                    />
                </Navbar.Brand>
                <div className="flex-end">
                    <Navbar.Toggle aria-controls="menu-navigation-menu" className="hamburger_menu" />
                    <Navbar.Collapse id="menu-navigation-menu">
                        <Nav>
                            {
                                wpMenu.wpMenu.menuItems.nodes.map((menuItem, i) => {
                                    return (
                                        <Link
                                            key={menuItem.url}
                                            to={menuItem.url}
                                            className="menu_item">
                                            {menuItem.label}
                                        </Link>
                                    )
                                })
                            }
                        </Nav>
                    </Navbar.Collapse>
                    <div className="estimation">
                        <a href="tel:+18447586225" className="button button-cyan">(844) PLUMB-ALL</a>
                    </div>
                </div>
            </Container>
        </Navbar>
    )
}

export default Menu
