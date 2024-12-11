import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./LoginPage.jsx";
import {AuthLayout} from "./AuthLayout.jsx";

export function AuthRoutes() {
    return (
        <Routes>
            <Route path={"/"} element={<AuthLayout/>}>
                <Route path={"/login"} element={<LoginPage/>}/>
            </Route>
        </Routes>
    );
}
