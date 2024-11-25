import axios from "axios";
import { useEffect, useState } from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"

function CategoriaListar() {
  const url = "/categorias";

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategorias();
  }, []);

  const getCategorias = async () => {
    try {
      const value = await AXIOS_CLIENT.get(url);
      setCategorias(value.data);
    } catch (error) {
      console.error("ERROR AL OBTENER CATEGORÍAS", error);
    }
  };

  const eliminar = async (id) => {
    await AXIOS_CLIENT.delete(`${url}/${id}`);
    setCategorias(categorias.filter((categoria) => categoria.id !== id));
  };

  return (
    <div className="container">
      <div className="container text-center">
        <h2>LISTAR CATEGORÍAS</h2>
      </div>

      <div>
        <button
          onClick={() => getCategorias()}
          className="btn btn-primary btn-lg w-10"
        >
          BUSCAR
        </button>
      </div>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">NOMBRE</th>
            <th scope="col">ACCIONES</th>
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
                    ELIMINAR
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

export default CategoriaListar;