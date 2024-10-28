import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ColorRegistrar from "./ColorRegistrar";
import MarcaRegistrar from "./MarcaRegistrar";
import CategoriaRegistrar from "./CategoriaRegistrar";
import TamanioRegistrar from "./TamanioRegistrar";
import ListarMarca from "./ListarMarca";
import ListarColor from "./ListarColor";
import ListarCategoria from "./ListarCategoria";
import ListarTamanio from "./ListarTamanio";

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
                <NavDropdown.Item as={Link} to="/colores">
                  LISTAR COLORES
                </NavDropdown.Item>
              </NavDropdown>
              
              <NavDropdown title="MARCA" id="basic-nav-dropdown-2">
                <NavDropdown.Item as={Link} to="/marca">
                  REGISTRAR NUEVA MARCA
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/marcas">
                  LISTAR MARCA
                </NavDropdown.Item>
              </NavDropdown>
              
              <NavDropdown title="CATEGORIA" id="basic-nav-dropdown-3">
                <NavDropdown.Item as={Link} to="/categoria">
                  REGISTRAR NUEVA CATEGORIA
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/categorias">
                  LISTAR CATEGORIAS
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="TAMAÑO" id="basic-nav-dropdown-4">
                <NavDropdown.Item as={Link} to="/tamanio">
                  REGISTRAR NUEVO TAMAÑO
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/tamanios">
                  LISTAR TAMAÑOS
                </NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/color" element={<ColorRegistrar/>} />
          <Route path="/colores" element={<ListarColor/>} />
          <Route path="/marca" element={<MarcaRegistrar/>} />
          <Route path="/categoria" element={<CategoriaRegistrar/>} />
          <Route path="/categorias" element={<ListarCategoria/>} />
          <Route path="/tamanio" element={<TamanioRegistrar/>} />
          <Route path="/tamanios" element={<ListarTamanio/>} />
          <Route path="/marca" element={<MarcaRegistrar/> } />
          <Route path="/marcas" element={<ListarMarca/> } />

        </Routes>
      </Container>
    </Router>
  );
}

export default App;
