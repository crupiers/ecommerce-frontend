import {Navbar, NavbarText} from "react-bootstrap";
import {Link} from "react-router-dom";

export function MenuUsuario() {
    return (
        <Navbar.Collapse id="basic-navbar-nav">
            <Navbar.Text as={Link} to={"/catalogo"} style={{textDecoration: "none", color: "gray"}}>
                CATÁLOGO
            </Navbar.Text>
        </Navbar.Collapse>
    );
}