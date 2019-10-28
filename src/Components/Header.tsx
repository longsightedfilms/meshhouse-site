import React, { useState } from 'react'
import { Translate } from "react-localize-redux"
import { NavLink as RRNavLink } from "react-router-dom"
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap'
import LanguageSelector from './LanguageSelector'
import logo from '../Assets/logo_text.svg'

const Header = (props: any) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <Navbar
      dark
      color="dark"
      expand="lg"
      fixed="top"
    >
      <NavbarBrand className="d-block d-lg-none"><img src={logo} alt="Meshhouse" /></NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse className="justify-content-center" isOpen={isOpen} navbar>
        <Nav className="flex-fill w-100 justify-content-end" navbar>
          <NavItem>
            <NavLink exact tag={RRNavLink} to={''}><Translate id="navigation.home" /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to={'/models'}><Translate id="navigation.models" /></NavLink>
          </NavItem>
        </Nav>
        <Nav className="flex-fill justify-content-center" navbar>
          <NavItem>
            <NavLink className="navbar-brand"><img src={logo} alt="Meshhouse" /></NavLink>
          </NavItem>
        </Nav>
        <Nav className="flex-fill w-100" navbar>
          <NavItem>
            <NavLink exact tag={RRNavLink} to={'/terms-of-use'}><Translate id="navigation.tos" /></NavLink>
          </NavItem>
          <NavItem>
            <NavLink exact tag={RRNavLink} to={'/application'}><Translate id="navigation.application" /></NavLink>
          </NavItem>
          <NavItem className="ml-auto">
            <LanguageSelector />
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  )
}

export default Header;