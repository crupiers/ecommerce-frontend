import axios from "axios";
import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"

function ColorListar() {
    const url = "/colores";

    const [colores, setColores] = useState([]);

    useEffect(() => {
        getColores();
    }, []);

    const getColores = async () => {
        try {
            const value = await AXIOS_CLIENT.get(url);
            setColores(value.data);
        } catch (error) {
            console.error("ERROR AL OBTENER COLORES", error);
        }
    };

    const eliminar = async (id) => {
        await AXIOS_CLIENT.delete(`${url}/${id}`);
        setColores(colores.filter((color) => color.id !== id));
    };

    return (
        <div className="container">
            <div className="container text-center">
                <h2>LISTAR COLORES</h2>
            </div>

            <div>
                <button
                    onClick={() => getColores()}
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

export default ColorListar;
