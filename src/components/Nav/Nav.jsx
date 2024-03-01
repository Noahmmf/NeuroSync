import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

//bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Navigation() {
  const user = useSelector((store) => store.user);

  return (
    <Navbar className="nav">
      <Container>
      <Navbar.Brand href="/home">
        <h2 className="nav-title">NueroSync</h2>
      </Navbar.Brand>
      <Nav>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Nav.Link className="navLink" to="/login">
            Login / Register
          </Nav.Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* <Nav.Link className="navLink" to="/user">
              Home
            </Nav.Link> */}

            

            <LogOutButton className="navLink" />
          </>
        )}

        
      </Nav>
      </Container>
    </Navbar>
  );
}


