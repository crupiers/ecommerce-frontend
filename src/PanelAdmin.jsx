import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";

function PanelAdmin() {
    return (
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto flex-nowrap">
                <NavDropdown title="AUDITORIA" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to={"/colores/auditoria"} className="text-nowrap">
                        COLOR
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/marcas/auditoria"} className="text-nowrap">
                        MARCA
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/categorias/auditoria"} className="text-nowrap">
                        CATEGORIA
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/tamanios/auditoria"} className="text-nowrap">
                        TAMAÑO
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/productos/auditoria"} className="text-nowrap">
                        PRODUCTO
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/productos/movimientoStock/auditoria"} className="text-nowrap">
                        MOVIMIENTO STOCK
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/pedidos/auditoria"} className="text-nowrap">
                        PEDIDOS
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="REGISTRAR" id="basic-nav-dropdown" data-cy="registrar-btn"> 
                    <NavDropdown.Item data-cy="registrar-color-btn"
                    as={Link} to="/colores/registrar" className="text-nowrap">
                        REGISTRAR COLOR
                    </NavDropdown.Item>
                    <NavDropdown.Item data-cy="registrar-marca-btn"
                    as={Link} to="/marcas/registrar" className="text-nowrap">
                        REGISTRAR MARCA
                    </NavDropdown.Item>
                    <NavDropdown.Item data-cy="registrar-categoria-btn"
                    as={Link} to="/categorias/registrar" className="text-nowrap">
                        REGISTRAR CATEGORÍA
                    </NavDropdown.Item>
                    <NavDropdown.Item data-cy="registrar-tamanio-btn"
                    as={Link} to="/tamanios/registrar" className="text-nowrap">
                        REGISTRAR TAMAÑO
                    </NavDropdown.Item>
                    <NavDropdown.Item data-cy="registrar-producto-btn"
                     as={Link} to="/productos/registrar" className="text-nowrap">
                        REGISTRAR PRODUCTO
                    </NavDropdown.Item>
                    <NavDropdown.Item data-cy="registrar-movimiento-stock-btn"
                    as={Link} to="/productos/movimientoStock" className="text-nowrap">
                        REGISTRAR MOVIMIENTO STOCK
                    </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="LISTAR" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/colores/listar" className="text-nowrap">
                        LISTAR COLORES
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/marcas/listar" className="text-nowrap">
                        LISTAR MARCAS
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/categorias/listar" className="text-nowrap">
                        LISTAR CATEGORÍAS
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/tamanios/listar" className="text-nowrap">
                        LISTAR TAMAÑOS
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/productos/listar" className="text-nowrap">
                        LISTAR PRODUCTOS
                    </NavDropdown.Item>
                </NavDropdown>
                <Navbar.Text as={Link} to={"/estadisticas/admin"} className={"ms-2 text-nowrap"} style={{textDecoration: "none", color: "gray"}}>
                    ESTADÍSTICAS ADMIN
                </Navbar.Text>
            </Nav>
        </Navbar.Collapse>
    )
}

export default PanelAdmin