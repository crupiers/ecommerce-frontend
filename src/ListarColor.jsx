import axios from "axios";
import { useEffect, useState } from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"

function ListarColor(){
  const url = "/color";

  const [colores, setColores] = useState([]);

  useEffect(() => {
    getColores();
  }, []);

  const getColores = async () => {
    try {
      const value = await AXIOS_CLIENT.get(url);
      setColores(value.data);
    } catch (error) {
      console.error("Error al obtener colores", error);
    }
  };

  const eliminar = async (id) => {
    await AXIOS_CLIENT.delete(`${url}/${id}`);
    setColores(colores.filter((color) => color.id !== id));
  };

  return (
    <div className="container">
      <div className="container text-center">
        <h2>Colores</h2>
      </div>

      <div>
        <button
          onClick={() => getColores()}
          className="btn btn-primary btn-lg w-10"
        >
          Buscar
        </button>
      </div>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {colores.map((color, indice) => (
            <tr key={indice}>
              <th scope="row">{color.id}</th>
              <td>{color.nombre}</td>
              <td className="text-center">
                <div>
                  <button
                    onClick={() => eliminar(color.id)}
                    className="btn btn-danger btn sm"
                  >
                    {" "}
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarColor;
