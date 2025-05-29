import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";

export function RegisterPage() {

    const [nombre, setNombre] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const navigate = useNavigate();

    async function handleOnSubmit(event) {
        event.preventDefault();

        try {
            let fechaNacimiento = new Date (2000,1,1);
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
            console.log(error)
            alert(`ERROR AL REGISTRAR USUARIO: \n${error.response.data.details.join('\n')}`);
        }
    }

    return (
        <div
            className={
                "vh-100 flex-column d-flex align-items-center justify-content-center gap-2"
            }
        >
            <h1>REGISTER</h1>
            <form
                onSubmit={handleOnSubmit}
                style={{
                    maxWidth: "400px",
                    width: "100%",
                }}
            >
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                        NOMBRE DE USUARIO
                    </label>
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
                    <label htmlFor="contrasenia" className="form-label">
                        CONTRASEÑA
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="contrasenia"
                        value={contrasenia}
                        onChange={(e) => setContrasenia(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    REGISTRAR USUARIO
                </button>
                <div className={"text-center mt-5"}>
                    <a href="/auth/login">¿Ya tienes una cuenta? Logueate aquí</a>
                </div>
            </form>
        </div>
    )

}