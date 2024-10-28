import axios from "axios";
import { useEffect, useState } from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"

function ListarMarca() {
  const url = "/marca";

  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    getMarcas();
  }, []);

  const getMarcas = async () => {
    try {
      const value = await AXIOS_CLIENT.get(url);
      setMarcas(value.data);
    } catch (error) {
      console.error("Error al obtener marcas", error);
    }
  };

  const eliminar = async (id) => {
    await AXIOS_CLIENT.delete(`${url}/${id}`);
    setMarcas(marcas.filter((marca) => marca.id !== id));
  };

  return (
    <div className="container">
      <div className="container text-center">
        <h2>Marcas</h2>
      </div>

      <div>
        <button
          onClick={() => getMarcas()}
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
          {marcas.map((marca, indice) => (
            <tr key={indice}>
              <th scope="row">{marca.id}</th>
              <td>{marca.nombre}</td>
              <td>{marca.descripcion}</td>
              <td className="text-center">
                <div>
                  <button
                    onClick={() => eliminar(marca.id)}
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

export default ListarMarca;
