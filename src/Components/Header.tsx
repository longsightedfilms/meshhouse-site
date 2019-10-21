import React, { useState } from 'react'
import { NavLink as RRNavLink } from "react-router-dom"
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap'
import logo from '../Assets/logo_text.svg'

const Header = (props: any) => {
  const routes = [
    { to: '', title: 'Home' },
    { to: '/models', title: 'Models' },
    //{ to: '/how-to-use', title: 'How to use models' },
    { to: '/terms-of-use', title: 'Terms of use' }
  ]
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Navbar
      dark
      color="dark"
      expand="lg"
      fixed="top"
      className="py-3"
    >
      <NavbarBrand><img src={logo} alt="Meshhouse"/></NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mx-auto" navbar>
          {routes.map((route, i) =>
            <NavItem key={i}>
              <NavLink
                exact
                tag={RRNavLink}
                to={route.to}
              >
                {route.title}
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Header;