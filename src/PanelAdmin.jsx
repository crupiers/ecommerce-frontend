import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

function PanelAdmin() {
    return (
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

                <NavDropdown title="AUDITORIA" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to={"/colores/auditoria"}>
                        COLOR
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/marcas/auditoria"}>
                        MARCA
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/categorias/auditoria"}>
                        CATEGORIA
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/tamanios/auditoria"}>
                        TAMAÑO
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/productos/auditoria"}>
                        PRODUCTO
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/productos/movimientoStock/auditoria"}>
                        MOVIMIENTO STOCK
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="REGISTRAR" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/colores/registrar">
                        REGISTRAR COLOR
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/marcas/registrar">
                        REGISTRAR MARCA
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/categorias/registrar">
                        REGISTRAR CATEGORÍA
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/tamanios/registrar">
                        REGISTRAR TAMAÑO
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/productos/registrar">
                        REGISTRAR PRODUCTO
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/productos/movimientoStock">
                        REGISTRAR MOVIMIENTO STOCK
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="LISTAR" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/colores/listar">
                        LISTAR COLORES
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/marcas/listar">
                        LISTAR MARCAS
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/categorias/listar">
                        LISTAR CATEGORÍAS
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/tamanios/listar">
                        LISTAR TAMAÑOS
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/productos/listar">
                        LISTAR PRODUCTOS
                    </NavDropdown.Item>
                </NavDropdown>

            </Nav>
        </Navbar.Collapse>
    )
}

export default PanelAdmin