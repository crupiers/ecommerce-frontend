import { AXIOS_CLIENT } from "./lib/axiosClient.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleOnSubmit(event) {
    event.preventDefault();
    const { nombre, contrasenia } = event.target;

    try {
      const response = await AXIOS_CLIENT.post("/auth/login", {
        nombre: nombre.value,
        contrasenia: contrasenia.value,
      });
      localStorage.setItem("token", response.data["jwt"]);
      nombre.value = "";
      contrasenia.value = "";
      navigate("/");
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
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contrasenia" className="form-label">
            CONTRASEÑA
          </label>
          <input
            type="contrasenia"
            className="form-control"
            name="contrasenia"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          INICIAR SESIÓN
        </button>
      </form>

      {error && <div className={"text-danger my-2"}>{error}</div>}
    </div>
  );
}
