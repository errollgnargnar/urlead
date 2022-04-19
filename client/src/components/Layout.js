import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";


export default function Layout() {

    const btnStyle = {
      textDecoration: "none",
    };
    
    let navigate = useNavigate();
    const handleLogout = () => {
      sessionStorage.removeItem('Auth Token');
      navigate('/login')
    }

    return (
      <div>
        {/* A "layout route" is a good place to put markup you want to
            share across all the pages on your site, like navigation. */}
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand>urLead</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto"  style={{display: "flex", flexDirection: "row", justifyContent:"space-evenly", alignItems: "center"}}>
                <Link to="/user/leads" style={btnStyle}>
                  Leads
                </Link>

                <NavDropdown title="Closed" id="basic-nav-dropdown">
                  <div >
                    <Link to="/user/closed-won" style={btnStyle} >
                      <div style={{height: "25px", padding: 0, margin: 0}}>
                      Won
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link to="/user/closed-lost" style={btnStyle}>
                    <div style={{height: "25px", padding: 0, margin: 0}}>
                      Lost
                      </div>
                    </Link>
                  </div>
                </NavDropdown>
                <NavDropdown title="Account" id="basic-nav-dropdown">
                  <NavDropdown.Item >Dashboard</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <hr />
  
        {/* An <Outlet> renders whatever child route is currently active,
            so you can think about this <Outlet> as a placeholder for
            the child routes we defined above. */}
        <Outlet />
      </div>
    );
  }