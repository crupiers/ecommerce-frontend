import React from "react";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./LoginPage.jsx";
import {AuthLayout} from "./AuthLayout.jsx";
import {RegisterPage} from "./RegisterPage.jsx";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path={"/"} element={<AuthLayout/>}>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/register"} element={<RegisterPage/>}/>
            </Route>
        </Routes>
    );
}
