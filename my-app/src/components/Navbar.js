import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
export default function Navigation() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Restaurants</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="booking">Booking</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
