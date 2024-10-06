import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ColorRegistrar from "./ColorRegistrar";
import MarcaRegistrar from "./MarcaRegistrar";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>eCommerce CRUPIERS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              
              <NavDropdown title="COLOR" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/color">
                  REGISTRAR NUEVO COLOR
                </NavDropdown.Item>
              </NavDropdown>
              
              <NavDropdown title="MARCA" id="basic-nav-dropdown-2">
                <NavDropdown.Item as={Link} to="/marca">
                  REGISTRAR NUEVA MARCA
                </NavDropdown.Item>
              </NavDropdown>
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/color" element={<ColorRegistrar/>} />
          <Route path="/marca" element={<MarcaRegistrar/>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
