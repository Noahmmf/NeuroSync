import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

//bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Row, Col } from "react-bootstrap";

export default function Navigation() {
  const user = useSelector((store) => store.user);

  return (
    <Navbar className="nav">
      <Container>
        <Navbar.Brand href="/home">
          <Row>
            <Col>
              <img src="./public/favicon.ico" alt="Brain Logo" />
            </Col>
            <Col>
              <h2 className="nav-title">NueroSync</h2>
            </Col>
          </Row>
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
              <Nav.Link style={{color:"white", marginRight:'40px'}} className="navLink" href="#user">
              Home
            </Nav.Link>
            <Nav.Link style={{color:"white", marginRight:'40px'}} className="navLink" href="#info">
              Household info
            </Nav.Link>

              <LogOutButton className="navLink" />
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
