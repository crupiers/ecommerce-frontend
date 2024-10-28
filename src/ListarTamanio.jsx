import axios from "axios";
import { useEffect, useState } from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"

function ListarTamanio() {
  const url = "/tamanio";

  const [tamanios, setTamanios] = useState([]);

  useEffect(() => {
    getTamanios();
  }, []);

  const getTamanios = async () => {
    try {
      const value = await AXIOS_CLIENT.get(url);
      setTamanios(value.data);
    } catch (error) {
      console.error("Error al obtener tamaños", error);
    }
  };

  const eliminar = async (id) => {
    await AXIOS_CLIENT.delete(`${url}/${id}`);
    setTamanios(tamanios.filter((tamanio) => tamanio.id !== id));
  };

  return (
    <div className="container">
      <div className="container text-center">
        <h2>Tamaños</h2>
      </div>

      <div>
        <button
          onClick={() => getTamanios()}
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
            <th scope="col">Descripcion</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tamanios.map((tamanio, indice) => (
            <tr key={indice}>
              <th scope="row">{tamanio.id}</th>
              <td>{tamanio.nombre}</td>
              <td>{tamanio.descripcion}</td>
              <td className="text-center">
                <div>
                  <button
                    onClick={() => eliminar(tamanio.id)}
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

export default ListarTamanio;