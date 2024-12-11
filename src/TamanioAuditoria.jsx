import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";

export function TamanioAuditoria() {

    useEffect(() => {
        getTamanios();
    }, []);

    const [tamanios, setTamanios] = useState([]);

    const getTamanios = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/admin/tamanios/auditoria");
            setTamanios(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER TAMAÑOS: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }


    return (
        <div className={"text-center mt-3"}>
            <h1>AUDITORIA TAMAÑOS</h1>
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
                </tr>
                </thead>
                {tamanios.map((tamanio, indice) => (
                    <tr key={indice}>
                        <td>{tamanio.id}</td>
                        <td>{tamanio.nombre}</td>
                        <td>{tamanio.descripcion}</td>
                        <td>{tamanio.createdBy}</td>
                        <td>{tamanio.createdAt}</td>
                        <td>{tamanio.updatedBy}</td>
                        <td>{tamanio.updatedAt}</td>
                        <td>{tamanio.deletedAt}</td>
                        <td>{tamanio.estado}</td>
                    </tr>
                ))}
            </Table>
        </div>
    )
}