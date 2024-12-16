import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function LoginPage() {
    const [error, setError] = useState("");
    const [nombre, setNombre] = useState("");
    const [contrasenia, setContrasenia] = useState("");
    const navigate = useNavigate();

    async function handleOnSubmit(event) {
        event.preventDefault();

        try {
            const response = await AXIOS_CLIENT.post("/auth/login", {
                nombre: nombre,
                contrasenia: contrasenia,
            });
            localStorage.setItem("token", response.data["jwt"]);
            localStorage.setItem("userId", response.data["id"]);
            localStorage.setItem("role", response.data["rol"]);
            localStorage.setItem("username", response.data["nombre"]);
            navigate("/catalogo");
        } catch {
            setError("USUARIO O CONTRASEÑA INCORRECTOS");
        }
    }

    return (
        <div
            className={
                "vh-100 flex-column d-flex align-items-center justify-content-center gap-2"
            }
        >
            <h1>LOGIN</h1>
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
                    INICIAR SESIÓN
                </button>
            </form>

            {error && <div className={"text-danger my-2"}>{error}</div>}
            <div className={"text-center mt-5"}>
                <a href="/auth/register">¿No tienes una cuenta? Registrate aquí</a>
            </div>
        </div>
    );
}
