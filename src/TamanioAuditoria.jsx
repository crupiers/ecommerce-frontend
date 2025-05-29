import React from "react";
import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

export function TamanioAuditoria() {

    useEffect(() => {
        getTamanios();
    }, []);

    const [tamanios, setTamanios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getTamanios = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/admin/tamanios/auditoria");
            setTamanios(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER TAMAÑOS: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredTamanios = tamanios.filter(tamanio =>
        tamanio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const eliminarTamanio = async (id) => {
        try {
            await AXIOS_CLIENT.delete(`/tamanios/${id}`);
            alert("TAMAÑO ELIMINADO CON ÉXITO");
            getTamanios();
        } catch (error) {
            alert(`ERROR AL ELIMINAR TAMAÑO: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    const activarTamanio = async (id) => {
        try {
            await AXIOS_CLIENT.put(`/tamanios/recuperar/${id}`);
            alert("TAMAÑO ACTIVADO CON ÉXITO");
            getTamanios();
        } catch (error) {
            alert(`ERROR AL ACTIVAR TAMAÑO: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    return (
        <div className={"text-center mt-3"}>
            <h1>AUDITORIA TAMAÑOS</h1>
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
                {filteredTamanios.map((tamanio, indice) => (
                    <tr key={indice}>
                        <td>{tamanio.id}</td>
                        <td>{tamanio.nombre}</td>
                        <td>{tamanio.descripcion}</td>
                        <td>{tamanio.createdBy}</td>
                        <td>{tamanio.createdAt}</td>
                        <td>{tamanio.updatedBy}</td>
                        <td>{tamanio.updatedAt}</td>
                        <td>{tamanio.deletedAt === null ? "N/A" : tamanio.deletedAt}</td>
                        <td>{tamanio.estado === 0 ? "ACTIVO" : "ELIMINADO"}</td>
                        {
                            <td>
                                {
                                    tamanio.estado === 0 ?
                                        <Link to="#" className={"bg-transparent text-danger"}
                                              onClick={() => eliminarTamanio(tamanio.id)}>Eliminar</Link>
                                        :
                                        <Link to="#" className={"bg-transparent text-success"}
                                              onClick={() => activarTamanio(tamanio.id)}>Activar</Link>
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