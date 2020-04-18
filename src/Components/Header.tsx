import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Translate } from "react-localize-redux"
import { NavLink as RRNavLink } from "react-router-dom"
import { Alert, Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Nav } from 'reactstrap'
import LanguageSelector from './LanguageSelector'

const Header = (props: any) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <React.Fragment>
      <Navbar
        dark
        color="dark"
        expand="lg"
        fixed="top"
      >
        <NavbarBrand>
          <img src={`${process.env.PUBLIC_URL}/assets/icons/logo-icon.svg`} alt="Meshhouse" />
          <p>
            <b>Mesh</b>house
          </p>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse className="justify-content-center" isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink exact tag={RRNavLink} to={''}><Translate id="navigation.home" /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to={'/models/all'}><Translate id="navigation.models" /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to={'/how-to-use-models'}><Translate id="navigation.howto" /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact tag={RRNavLink} to={'/terms-of-use'}><Translate id="navigation.tos" /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact tag={RRNavLink} to={'/application'}><Translate id="navigation.application" /></NavLink>
            </NavItem>
            <NavItem>
              <LanguageSelector />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      {props.error.visible === true &&
        <Alert className="navbar-error" color="danger">
          <Translate id="errors.placeholder" /> <Translate id={props.error.message} />
        </Alert>
      }
    </React.Fragment>
  )
}

function mapStateToProps (state: any) {
  return { error: state.error }
}

export default connect(mapStateToProps)(Header)
