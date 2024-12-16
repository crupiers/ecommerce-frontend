import {useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";

function UsuarioActualizar() {

    const userId = localStorage.getItem("userId");

    const [usuario, setUsuario] = useState({
        nombre: "",
        contrasenia: "",
    });

    const {nombre, contrasenia} = usuario;

    const onInputChange = (e) => {
        if (e?.target?.name === undefined || e?.target?.value === undefined) return;
        setUsuario({...usuario, [e.target.name]: e.target.value});
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await AXIOS_CLIENT.put(`/usuarios/${userId}`, usuario);
            alert("USUARIO ACTUALIZADO CON ÉXITO")
            localStorage.removeItem("token");
            window.location.href = "/";
        } catch (error) {
            alert(`ERROR AL ACTUALIZAR USUARIO: \n${error.response.data.message}`);
        }
    };

    return (
        <div className="container">
            <div className="container text-center mt-3">
                <h1>ACTUALIZAR USUARIO</h1>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">NOMBRE</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        required={true}
                        value={nombre}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="contrasenia" className="form-label">CONTRASEÑA</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contrasenia"
                        name="contrasenia"
                        value={contrasenia}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">ACTUALIZAR</button>
            </form>
        </div>
    )

}

export default UsuarioActualizar