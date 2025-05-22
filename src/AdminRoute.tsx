import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";


enum ROLES {
    USER = "ROLE_USER",
    ADMIN = "ROLE_ADMIN"
}

export function AdminRoute({children}: PropsWithChildren) {
    const role = (localStorage.getItem("role") ?? ROLES.USER) as ROLES;
    if (role === ROLES.ADMIN) return children;
    return <Navigate to="/" replace />
}