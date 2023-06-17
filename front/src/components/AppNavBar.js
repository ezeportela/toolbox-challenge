import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const AppNavBar = () => {
  return (
    <Navbar expand="lg" className="bg-danger" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="#home">React Test App</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default AppNavBar;
