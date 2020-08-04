import React from 'react';
import {
    Link
} from 'react-router-dom';
import '../css/wizard-navigation.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import groupslogo from "../img/groupslogo4.png";
import flynancelogo from "../img/FlynanceFullTitle.png";

class WizardNav extends React.Component {
    render() {
        return (
            <Navbar class="menu-nav" expand="lg" style={{backgroundColor: 'transparent'}}>

  <Navbar.Brand href="/" className="ml-md-5 text-dark"><img class="groupslogo" src={flynancelogo}></img></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
    <Nav className="p-3">
    <Link class="link" to="/Product">Product</Link>
    <Link class="link" to="/Pricing">Pricing</Link>
    <Link class="link" to="/Help">Support</Link>
    <Link class="link-login" to="/app/login">Login</Link>



    </Nav>
  </Navbar.Collapse>
</Navbar>

        )
    }
}

export default WizardNav;
