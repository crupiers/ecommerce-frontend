import React from "react";
import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

export function ColorAuditoria() {

    useEffect(() => {
        getColores();
    }, []);

    const [colores, setColores] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getColores = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/admin/colores/auditoria");
            setColores(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER COLORES: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredColores = colores.filter(color =>
        color.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const eliminarColor = async (id) => {
        try {
            await AXIOS_CLIENT.delete(`/colores/${id}`);
            alert("COLOR ELIMINADO CON ÉXITO");
            getColores();
        } catch (error) {
            alert(`ERROR AL ELIMINAR COLOR: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    const activarColor = async (id) => {
        try {
            await AXIOS_CLIENT.put(`/colores/recuperar/${id}`);
            alert("COLOR ACTIVADO CON ÉXITO");
            getColores();
        } catch (error) {
            alert(`ERROR AL ACTIVAR COLOR: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    return (
        <div className={"text-center mt-3"}>
            <h1>AUDITORIA COLORES</h1>
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
                {filteredColores.map((color, indice) => (
                    <tr key={indice}>
                        <td>{color.id}</td>
                        <td>{color.nombre}</td>
                        <td>{color.descripcion}</td>
                        <td>{color.createdBy}</td>
                        <td>{color.createdAt}</td>
                        <td>{color.updatedBy}</td>
                        <td>{color.updatedAt}</td>
                        <td>{color.deletedAt === null ? "N/A" : color.deletedAt}</td>
                        <td>{color.estado === 0 ? "ACTIVO" : "ELIMINADO"}</td>
                        {
                            <td>
                                {
                                    color.estado === 0 ?
                                        <Link to="#" className={"bg-transparent text-danger"}
                                              onClick={() => eliminarColor(color.id)}>Eliminar</Link>
                                        :
                                        <Link to="#" className={"bg-transparent text-success"}
                                              onClick={() => activarColor(color.id)}>Activar</Link>
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
