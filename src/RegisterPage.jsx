import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AXIOS_CLIENT } from "./lib/axiosClient.js";
import "./RegisterPage.css";

export function RegisterPage() {
    const [nombre, setNombre] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleOnSubmit(event) {
        event.preventDefault();

        try {
            let fechaNacimiento = new Date(2000, 1, 1);
            const response = await AXIOS_CLIENT.post("/auth/register", {
                nombre: nombre,
                contrasenia: contrasenia,
                fechaNacimiento: fechaNacimiento,
            });
            localStorage.setItem("token", response.data["jwt"]);
            localStorage.setItem("userId", response.data["id"]);
            localStorage.setItem("role", response.data["rol"]);
            localStorage.setItem("username", response.data["nombre"]);
            navigate("/");
        } catch (error) {
            setError(
                error?.response?.data?.details
                    ? `ERROR AL REGISTRAR USUARIO:\n${error.response.data.details.join('\n')}`
                    : "ERROR AL REGISTRAR USUARIO"
            );
        }
    }

    return (
        <div className="register-page">
            {/* Sección izquierda solo con imagen */}
            <div className="register-left"></div>
            {/* Sección derecha con el texto y el formulario */}
            <div className="register-right">
                <div style={{ width: "100%", maxWidth: "400px" }}>
                    <div className="register-brand mb-4">eCommerce Crupiers</div>
                    <form onSubmit={handleOnSubmit} className="register-form">
                        <h2 className="text-center mb-4">Registro de Usuario</h2>
                        <div className="mb-3">
                            <label className="form-label">Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                name="contrasenia"
                                value={contrasenia}
                                onChange={(e) => setContrasenia(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100">
                            Registrar Usuario
                        </button>
                        {error && (
                            <div className="error-message">{error}</div>
                        )}
                        <div className="text-center mt-3">
                            <a href="/auth/login">¿Ya tienes una cuenta? Logueate aquí</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}