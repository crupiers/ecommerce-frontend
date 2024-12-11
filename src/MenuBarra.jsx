import {Container, NavDropdown, Navbar, Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import {MenuUsuario} from "./MenuUsuario.jsx";
import PanelAdmin from "./PanelAdmin.jsx";
import {useState} from "react";

export function MenuBarra() {

    function handleOnClickLogout() {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
    }

    const [showAdminPanel, setShowAdminPanel] = useState(false);

    function handleOnClickAdminPanel() {
        setShowAdminPanel(!showAdminPanel);
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand className={"align-items-center"}>
                        <img
                            src={"https://avatars.githubusercontent.com/u/179946814?s=400&u=cda895bd2aadd6e4be2bcce97ef631b1207afc29&v=4"}
                            alt={"Crupiers"} height={40} width={40}></img>
                        <span className={"ms-2 fw-bold"}>e-Commerce Crupiers</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    {
                        showAdminPanel ? <PanelAdmin/> : <MenuUsuario/>
                    }
                    <>
                        {localStorage.getItem("role") === "ROLE_ADMIN" ?
                            <Button variant={"outline-danger"} className={"me-5 align-items-center d-flex"} onClick={handleOnClickAdminPanel}>
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-shield-fill me-2" viewBox="0 0 16 16">
                                        <path
                                            d="M5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56"/>
                                    </svg>
                                    <span>PANEL DE ADMINISTRADOR</span>
                                </>
                            </Button> : <></>}
                    </>
                    <NavDropdown id="basic-nav-dropdown-4" className={"me-3"} title={
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" height={24} width={24} fill="currentColor"
                                 className="bi bi-person-fill me-1" viewBox="0 0 16 16">
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                            </svg>
                            <span>{localStorage.getItem("username")}</span>
                        </>
                    }>
                        <NavDropdown.Item>
                            <Button className={"me-2 align-items-center d-flex"} type={"button"} variant={"danger"}
                                    onClick={handleOnClickLogout}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height={24} width={24}
                                     className="bi bi-box-arrow-left me-2" viewBox="0 0 16 16">
                                    <path
                                        d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                                    <path
                                        d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                                </svg>
                                CERRAR SESIÓN
                            </Button>
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/usuarios/actualizar">
                            ACTUALIZAR USUARIO
                        </NavDropdown.Item>
                    </NavDropdown>
                </Container>
            </Navbar>
        </>
    )
}