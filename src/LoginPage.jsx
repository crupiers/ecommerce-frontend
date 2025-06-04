import React from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./LoginPage.css";


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
        <div className="login-page">
  {/* Sección izquierda solo con imagen */}
  <div className="login-left">
    {/* La imagen de fondo se define por CSS en .login-left */}
    {/* No es necesario agregar <img> aquí */}
  </div>

  {/* Sección derecha con el texto y el formulario */}
  <div className="login-right">
    <div style={{ width: "100%", maxWidth: "400px" }}>
      <div className="login-brand mb-4">eCommerce Crupiers</div>
      <form
        onSubmit={handleOnSubmit}
        className="login-form"
      >
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
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
          Entrar
        </button>
        <div className="text-center mt-3">
          <a href="/auth/register">¿No tienes una cuenta? Regístrate aquí</a>
        </div>
      </form>
    </div>
  </div>
</div>
    );
}
