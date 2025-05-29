import React from "react";
import {Outlet} from "react-router-dom";
import {Container} from "react-bootstrap";
import {MenuBarra} from "./MenuBarra.jsx";

export function AppLayout() {
    return (
        <>
            <MenuBarra/>
            <Container>
                <Outlet/>
            </Container>
        </>
    )
}