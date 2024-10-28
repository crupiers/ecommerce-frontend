import axios from "axios";
import { useEffect, useState } from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"

function ListarCategoria() {
  const url = "/categoria";

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategorias();
  }, []);

  const getCategorias = async () => {
    try {
      const value = await AXIOS_CLIENT.get(url);
      setCategorias(value.data);
    } catch (error) {
      console.error("Error al obtener categorias", error);
    }
  };

  const eliminar = async (id) => {
    await AXIOS_CLIENT.delete(`${url}/${id}`);
    setCategorias(categorias.filter((categoria) => categoria.id !== id));
  };

  return (
    <div className="container">
      <div className="container text-center">
        <h2>Categorias</h2>
      </div>

      <div>
        <button
          onClick={() => getCategorias()}
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
          {categorias.map((categoria, indice) => (
            <tr key={indice}>
              <th scope="row">{categoria.id}</th>
              <td>{categoria.nombre}</td>
              <td>{categoria.descripcion}</td>
              <td className="text-center">
                <div>
                  <button
                    onClick={() => eliminar(categoria.id)}
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

export default ListarCategoria;