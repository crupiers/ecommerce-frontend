import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

function PanelAdmin() {
    return (
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <NavDropdown title="AUDITORIA" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to={"/admin/colores"}>
                        COLOR
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/admin/marcas"}>
                        MARCA
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/admin/categorias"}>
                        CATEGORIA
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/admin/tamanios"}>
                        TAMAÑO
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    )
}

export default PanelAdmin