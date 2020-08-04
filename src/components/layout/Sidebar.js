import React from 'react';
import {
    Link
} from 'react-router-dom';
import '../../css/sidebar.css';
import help from '../../img/icons/help.png';
import calendar from '../../img/icons/calendar.png';
import dashboard from '../../img/icons/dashboard.png';
import people from '../../img/icons/people-2-light.png';
import logout from '../../img/icons/logout.png';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

class Sidebar extends React.Component {
    render() {
      const nav = window.innerWidth <= 760 ? (
        <Navbar className="d-block d-sm-none" expand="lg" style={{backgroundColor: 'transparent'}}>
  <Navbar.Brand href="#" className="ml-md-5 text-dark"><h4 className="logo">Flynance Groups</h4></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
    <Nav className="p-3">
     <Link class="nav-link active" to="/app/travelers">
            <img class="mr-2" src={people} width="15px" />
          Travelers</Link>
      <Link class="nav-link" to="/app/payments">
<img class="mr-2" src={calendar} width="12px" />
            Payments</Link>
       <Link class="nav-link" to="/app/itinerary">
<img class="mr-2" src={dashboard} width="15px" />
          Trip Itinerary</Link>
     <a class="nav-link" href="#">
            <img class="mr-2" src={help} width="15px" />
          Help</a>
      <Link class="nav-link" onClick={async () => {
      await Auth.signOut();
      window.location.reload();
    }}>
        <img class="mr-2" src={logout} width="15px" />
          Logout</Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
      ) : (
        <ul class="nav flynance-nav flex-column mb-5 d-none d-sm-block">
  <li class="nav-item">
            <Link class="nav-link active" to="/app/travelers">
            <img class="mr-2" src={people} width="15px" />
          Travelers</Link>
  </li>
  <li class="nav-item">
            <Link class="nav-link" to="/app/payments">
<img class="mr-2" src={calendar} width="12px" />
            Payments</Link>
  </li>
  <li class="nav-item">
            <Link class="nav-link" to="/app/itinerary">
<img class="mr-2" src={dashboard} width="15px" />
          Trip Itinerary</Link>
  </li>
  <li class="nav-item">
            <a class="nav-link" href="#">
            <img class="mr-2" src={help} width="15px" />
          Help</a>
    <Link class="nav-link" onClick={async () => {
      await Auth.signOut();
      window.location.reload();
    }}>
      <img class="mr-2" src={logout} width="15px" />
          Logout</Link>
  </li>
</ul>
      );
        return nav;
    }
}

export default Sidebar;
