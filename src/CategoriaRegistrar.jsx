import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {AXIOS_CLIENT} from "./lib/axiosClient"

function CategoriaRegistrar() {

  const [Categoria, setCategoria] = useState({
    nombre: ""
  });

  const { nombre } = Categoria;

  const onInputChange = (e) => {
    if (e?.target?.name === undefined || e?.target?.value === undefined) return;
    setCategoria({ ...Categoria, [e.target.name]: e.target.value });
  };

  /**
   * Función constante para consultar al backend por una Categoria duplicada.
   *
   * @returns {Promise<boolean>} `true` si la Categoria ya existe, `false` en caso contrario.
   */
  
  const checkDuplicate = async () => {
    try {
      // Realizar una petición GET al backend para verificar si la Categoria ya existe.
      const response = await AXIOS_CLIENT.get(
        `/categoria/existe/${nombre}`
      );
      return response.data!="";
    } catch (error) {
      console.error("Error checking duplicate", error);
      throw new Error("Error while checking duplicate");
    }
  };

  /** Handler para gestionar la subida del formulario/confirmación de agregar. */
  const onSubmit = async (e) => {
    // Prevenir que se procese el `submit` por defecto del formulario para evitar recargar la página.
    e.preventDefault();

    try {
      // Validar si existe una Categoria duplicada.
      const isDuplicate = await checkDuplicate();
      console.log("ESTÁ DUPLICADO: "+isDuplicate)
      if (isDuplicate) {
        alert("LA CATEGORIA YA EXISTE");
        return;
      }
        
      // Declarar la URL a donde se realizará la petición HTTP.
      const urlBase = "/categoria";

      // Utilizar Axios para realizar una petición POST a la URL declarada, enviando la información de la Categoria.
      await AXIOS_CLIENT.post(urlBase, Categoria);
      alert("CATEGORIA REGISTRADA CON ÉXITO")
    } catch (error) {
      alert("error al obtener categoria(?", error);
      console.error("Error al obtener Categoria", error);
    }
  };

  return (
    <div>
    <h1>REGISTRAR NUEVA CATEGORIA</h1>
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
      <button type="submit" className="btn btn-primary">REGISTRAR</button>
    </form>
  </div>
  );
}

export default CategoriaRegistrar;