import axios from "axios";
import { useEffect, useState } from "react";

function ListadoMarcas2() {
  const url = "http://localhost:8080/PA/marcas";
  const url2 = "http://localhost:8080/PA/marca";

  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    getMarcas();
  }, []);

  const getMarcas = async () => {
    try {
      const value = await axios.get(url);
      setMarcas(value.data);
    } catch (error) {
      console.error("Error al obtener marcas", error);
    }
  };

  const eliminar = async (id) => {
    await axios.delete(`${url2}/${id}`);
    setMarcas(marcas.filter((marca) => marca.id !== id));
  };

  return (
    <div className="container">
      <div className="container text-center">
        <h2>Marcas 2</h2>
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
            <th scope="col">Denominación</th>
            <th scope="col">Observación</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas.map((marca, indice) => (
            <tr key={indice}>
              <th scope="row">{marca.id}</th>
              <td>{marca.denominacion}</td>
              <td>{marca.observacion}</td>
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

export default ListadoMarcas2;
