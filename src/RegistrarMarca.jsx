import axios from "axios";
import { useState } from "react";

function AgregarMarca3() {
  const [marca, setMarca] = useState({
    denominacion: "",
    observacion: "",
  });

  const { denominacion, observacion } = marca;

  /** Handler para gestionar el cambio de los inputs. */
  const onInputChange = (e) => {
    // Safe navigators/Optional chaining: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
    if (e?.target?.name === undefined || e?.target?.value === undefined) return;

    // Spread operator ... (expandir los atributos)
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
      const response = await axios.get(
        `http://localhost:8080/PA/marcaExiste?denominacion=${denominacion}`
      );

      // Retorna si está duplicada o no.
      // Estos operadores son para manejar valores nulos o indefinidos de forma segura.
      //
      // El safe navigator (?) permite acceder a propiedades de un objeto sin que se genere un error si el objeto es `null` o `undefined`.
      // En caso de que si sea `null` o `undefined`, el resultado de la expresión será `undefined`.
      //
      // El nullish coalescing (??) permite especificar un valor en caso de que el valor de la izquierda sea `null` o `undefined`.
      // Esto permite que retorne el `response.data.exists` si esta definido, pero si no lo está porque la response no lo tiene o cambió
      // su formato, retornará `false` gracias al nullish coalescing.
      //
      // Exploralos debajo:
      // Safe navigators/Optional chaining: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      // Nullish coalescing: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
      return response?.data?.exists ?? false;
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
      // Validar si existe una marca duplicada.
      const isDuplicate = await checkDuplicate();

      // Si la marca ya existe, mostrar un mensaje de alerta y no continuar con la operación.
      if (isDuplicate) {
        alert("La denominación ya existe.");
        return;
      }

      // Declarar la URL a donde se realizará la petición HTTP.
      const urlBase = "http://localhost:8080/PA/marca";

      // Utilizar Axios para realizar una petición POST a la URL declarada, enviando la información de la marca.
      await axios.post(urlBase, marca);
    } catch (error) {
      alert("Error al guardar marca", error);
      console.error("Error al obtener marcas", error);
    }
  };
  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Formulario Agregar Marca 3</h3>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="denominación" className="form-label">
            Denominación
          </label>
          <input
            type="text"
            className="form-control"
            id="denominacion"
            name="denominacion"
            required={true}
            value={denominacion}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="observación" className="form-label">
            Obsevacion
          </label>
          <input
            type="text"
            className="form-control"
            id="observacion"
            name="observacion"
            value={observacion}
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

export default AgregarMarca3;
