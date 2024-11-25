import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {AXIOS_CLIENT} from "./lib/axiosClient"

function ColorRegistrar() {

  const [Color, setColor] = useState({
    nombre: "",
    descripcion:""
  });

  const { nombre, descripcion } = Color;

  const onInputChange = (e) => {
    if (e?.target?.name === undefined || e?.target?.value === undefined) return;
    setColor({ ...Color, [e.target.name]: e.target.value });
  };

  /**
   * Función constante para consultar al backend por una Color duplicada.
   *
   * @returns {Promise<boolean>} `true` si la Color ya existe, `false` en caso contrario.
   */
  
  const checkDuplicate = async () => {
    try {
      // Realizar una petición GET al backend 
      const response = await AXIOS_CLIENT.get(
        `/colores/existe/${nombre}`
      );
      return !!response.data; 
    } catch (error) {
      throw new Error("ERROR AL BUSCAR COLOR DUPLICADO");
    }
  };

  /** Handler para gestionar la subida del formulario/confirmación de agregar. */
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validar si existe un Color duplicado.
      const isDuplicate = await checkDuplicate();
      if (isDuplicate) {
        alert("EL COLOR YA EXISTE");
        return;
      }

      // Utilizar Axios para realizar una petición POST a la URL declarada, enviando la información de la Color.
      await AXIOS_CLIENT.post("/colores", Color);
      alert("COLOR REGISTRADO CON ÉXITO")
    } catch (error) {
      alert("ERROR AL REGISTRAR COLOR", error);
    }
  };

  return (
    <div className="container">
      <div className="container text-center" style={{}}>
        <h3>REGISTRAR COLOR</h3>
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

        <label htmlFor="descripcion" className="form-label">DESCRIPCIÓN</label>
        <input
            type="text"
            className="form-control"
            id="descripcion"
            name="descripcion"
            required={true}
            value={descripcion}
            onChange={(e) => onInputChange(e)}
          />
      </div>
      
      <button type="submit" className="btn btn-primary">REGISTRAR</button>
    </form>
  </div>
  );
}

export default ColorRegistrar;