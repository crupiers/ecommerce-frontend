import React from "react";
import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"
import {Table} from "react-bootstrap";
import {Form} from "react-bootstrap";
import { Link } from "react-router-dom";

function CategoriaListar() {
    const url = "/categorias";

    const [categorias, setCategorias] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCategorias = categorias.filter(categoria =>
        categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={"text-center mt-3"}>
            <h1>LISTA CATEGORIAS</h1>
            <Form.Control
                type="text"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={handleSearchChange}
                className={"mt-3"}
            />
            <Table className={"mt-3"} bordered>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Actualizar</th>
                </tr>
                </thead>
                <tbody>
                {filteredCategorias.map((categoria, indice) => (
                    <tr key={indice}>
                        <td>{categoria.id}</td>
                        <td>{categoria.nombre}</td>
                        <td>{categoria.descripcion}</td>
                        <td>
                            <Link
                            to={`/categorias/actualizar/${categoria.id}`}
                            className="btn btn-link btn-sm me-3">
                                Actualizar
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CategoriaListar;