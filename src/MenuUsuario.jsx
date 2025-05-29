import React from "react";
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export function MenuUsuario() {
    return (
        <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Text as={Link} to={"/catalogo"} className={"me-2"} style={{textDecoration: "none", color: "gray"}}>
                CATÁLOGO
            </Navbar.Text>
            <Navbar.Text as={Link} to={"/estadisticas"} className={"me-2"} style={{textDecoration: "none", color: "gray"}}>
                ESTADÍSTICAS
            </Navbar.Text>
        </Navbar.Collapse>
    );
}