import React from "react";
import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

export function CategoriaAuditoria() {

    useEffect(() => {
        getCategorias();
    }, []);

    const [categorias, setCategorias] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getCategorias = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/admin/categorias/auditoria");
            setCategorias(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER CATEGORIAS: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCategorias = categorias.filter(categoria =>
        categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const eliminarCategoria = async (id) => {
        try {
            await AXIOS_CLIENT.delete(`/categorias/${id}`);
            alert("CATEGORIA ELIMINADO CON ÉXITO");
            getCategorias();
        } catch (error) {
            alert(`ERROR AL ELIMINAR CATEGORIA: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    const activarCategoria = async (id) => {
        try {
            await AXIOS_CLIENT.put(`/categorias/recuperar/${id}`);
            alert("CATEGORIA ACTIVADO CON ÉXITO");
            getCategorias();
        } catch (error) {
            alert(`ERROR AL ACTIVAR CATEGORIA: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    return (
        <div className={"text-center mt-3"}>
            <h1>AUDITORIA CATEGORIAS</h1>
            <Form.Control
                type="text"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={handleSearchChange}
                className={"mt-3"}
            />
            <Table className={"mt-3"} bordered responsive>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Creado por</th>
                    <th>Creado en</th>
                    <th>Actualizado por</th>
                    <th>Actualizado en</th>
                    <th>Borrado en</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {filteredCategorias.map((categoria, indice) => (
                    <tr key={indice}>
                        <td>{categoria.id}</td>
                        <td>{categoria.nombre}</td>
                        <td>{categoria.descripcion}</td>
                        <td>{categoria.createdBy}</td>
                        <td>{categoria.createdAt}</td>
                        <td>{categoria.updatedBy}</td>
                        <td>{categoria.updatedAt}</td>
                        <td>{categoria.deletedAt === null ? "N/A" : categoria.deletedAt}</td>
                        <td>{categoria.estado === 0 ? "ACTIVO" : "ELIMINADO"}</td>
                        {
                            <td>
                                {
                                    categoria.estado === 0 ?
                                        <Link to="#" className={"bg-transparent text-danger"}
                                              onClick={() => eliminarCategoria(categoria.id)}>Eliminar</Link>
                                        :
                                        <Link to="#" className={"bg-transparent text-success"}
                                              onClick={() => activarCategoria(categoria.id)}>Activar</Link>
                                }
                            </td>
                        }
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}