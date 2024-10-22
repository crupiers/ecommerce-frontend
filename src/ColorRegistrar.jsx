import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ColorRegistrar() {

  

  const [Color, setColor] = useState({
    nombre: ""
  });

  const { nombre } = Color;

  /** Handler para gestionar el cambio de los inputs. */
  const onInputChange = (e) => {
    // Safe navigators/Optional chaining: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    if (e?.target?.name === undefined || e?.target?.value === undefined) return;
    // Spread operator ... (expandir los atributos)
    setColor({ ...Color, [e.target.name]: e.target.value });
  };

  /**
   * Función constante para consultar al backend por una Color duplicada.
   *
   * @returns {Promise<boolean>} `true` si la Color ya existe, `false` en caso contrario.
   */
  
  
  const checkDuplicate = async () => {
    try {
      // Realizar una petición GET al backend para verificar si la Color ya existe.
      const response = await axios.get(
        `http://localhost:8080/eCommerce/color/existe/${nombre}`
      );
      return response.data!=""; //si la data no tiene nada, el color no está registrado (no se encuentra duplicado)
    } catch (error) {
      console.error("Error checking duplicate", error);

      // Tirar un error. En el ejemplo, el try/catch del `onSubmit` manejará el error si ocurriría.
      throw new Error("Error while checking duplicate");
    }
  };

  /** Handler para gestionar la subida del formulario/confirmación de agregar. */
  const onSubmit = async (e) => {
    // Prevenir que se procese el `submit` por defecto del formulario para evitar recargar la página.
    e.preventDefault();

    try {
      
      
      // Validar si existe una Color duplicada.
      const isDuplicate = await checkDuplicate();
      console.log("ESTÁ DUPLICADO: "+isDuplicate)
      // Si la Color ya existe, mostrar un mensaje de alerta y no continuar con la operación.
      if (isDuplicate) {
        alert("EL COLOR YA EXISTE");
        return;
      }
        
      
      // Declarar la URL a donde se realizará la petición HTTP.
      const urlBase = "http://localhost:8080/eCommerce/color";

      // Utilizar Axios para realizar una petición POST a la URL declarada, enviando la información de la Color.
      await axios.post(urlBase, Color);
      alert("COLOR REGISTRADO CON ÉXITO")
    } catch (error) {
      alert("error al obtener color (?", error);
      console.error("Error al obtener Colors", error);
    }
  };

  return (
    <div>
    <h1>REGISTRAR NUEVO COLOR</h1>
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

export default ColorRegistrar;
