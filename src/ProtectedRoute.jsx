import {Navigate} from "react-router-dom";

export function ProtectedRoute({children}) {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to={"/auth/login"}/>;
}
