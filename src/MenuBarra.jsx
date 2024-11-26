import {Container, Nav, NavDropdown, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export function MenuBarra() {
  return (
          
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>e-Commerce Crupiers</Navbar.Brand>
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
                  LISTAR MARCAS
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
  )
}