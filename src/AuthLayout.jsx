import React from "react";
import {Outlet} from "react-router-dom";
import {Container} from "react-bootstrap";

export function AuthLayout() {
    return (
        <Container>
            <Outlet/>
        </Container>
    );
}
