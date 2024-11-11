import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ColorRegistrar from "./ColorRegistrar";
import MarcaRegistrar from "./MarcaRegistrar";
import CategoriaRegistrar from "./CategoriaRegistrar";
import TamanioRegistrar from "./TamanioRegistrar";
import MarcaListar from "./MarcaListar";
import ColorListar from "./ColorListar";
import CategoriaListar from "./CategoriaListar";
import TamanioListar from "./TamanioListar";

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
                <NavDropdown.Item as={Link} to="/colores/registrar">
                  REGISTRAR COLOR
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/colores/listar">
                  LISTAR COLORES
                </NavDropdown.Item>
              </NavDropdown>
              
              <NavDropdown title="MARCA" id="basic-nav-dropdown-2">
                <NavDropdown.Item as={Link} to="/marcas/registrar">
                  REGISTRAR MARCA
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/marcas/listar">
                  LISTAR MARCA
                </NavDropdown.Item>
              </NavDropdown>
              
              <NavDropdown title="CATEGORIA" id="basic-nav-dropdown-3">
                <NavDropdown.Item as={Link} to="/categorias/registrar">
                  REGISTRAR CATEGORÍA
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/categorias/listar">
                  LISTAR CATEGORÍAS
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="TAMAÑO" id="basic-nav-dropdown-4">
                <NavDropdown.Item as={Link} to="/tamanios/registrar">
                  REGISTRAR TAMAÑO
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tamanios/listar">
                  LISTAR TAMAÑOS
                </NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/colores/registrar" element={<ColorRegistrar/>} />
          <Route path="/colores/listar" element={<ColorListar/>} />
          <Route path="/categorias/registrar" element={<CategoriaRegistrar/>} />
          <Route path="/categorias/listar" element={<CategoriaListar/>} />
          <Route path="/tamanios/registrar" element={<TamanioRegistrar/>} />
          <Route path="/tamanios/listar" element={<TamanioListar/>} />
          <Route path="/marcas/registrar" element={<MarcaRegistrar/> } />
          <Route path="/marcas/listar" element={<MarcaListar/> } />

        </Routes>
      </Container>
    </Router>
  );
}

export default App;
