import axios from "axios";
import { useState } from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"

function MarcaRegistrar() {
  const [marca, setMarca] = useState({
    nombre: "",
    descripcion: "",
  });

  const { nombre , descripcion} = marca;

  const onInputChange = (e) => {
    if (e?.target?.name === undefined || e?.target?.value === undefined) return;
    setMarca({ ...marca, [e.target.name]: e.target.value });
  };

  /**
   * Función constante para consultar al backend por una marca duplicada.
   *
   * @returns {Promise<boolean>} `true` si la marca ya existe, `false` en caso contrario.
   */

  const checkDuplicate = async () => {
    try {
      // Realizar una petición GET al backend para verificar si la marca ya existe.
      const response = await AXIOS_CLIENT.get(`/marca/existe/${nombre}`)
      return !!response.data
    } catch (error) {
      console.error("Error checking duplicate", error);

      // Tirar un error. En el ejemplo, el try/catch del `onSubmit` manejará el error si ocurriría.
      throw new Error("Error while checking duplicate");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const isDuplicate = await checkDuplicate();
      console.log("ESTÁ DUPLICADO: "+isDuplicate)
      if (isDuplicate) {
        alert("LA MARCA YA EXISTE");
        return;
      }
        
      // Declarar la URL a donde se realizará la petición HTTP.
      const urlBase = "/marca";

      // Utilizar Axios para realizar una petición POST a la URL declarada, enviando la información del tamaño.
      await AXIOS_CLIENT.post(urlBase, marca);
      alert("MARCA REGISTRADO CON ÉXITO")
    } catch (error) {
      alert("Error al obtener marca (?", error);
      console.error("Error al obtener Marca", error);
    }
  };
  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3> REGISTRAR NUEVA MARCA </h3>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            DENOMINACION
          </label>
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
          <label htmlFor="descripcion" className="form-label">
            OBSERVACION
          </label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={descripcion}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">
            Agregar
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Regresar
          </a>
        </div>
      </form>
    </div>
  );
}

export default MarcaRegistrar;