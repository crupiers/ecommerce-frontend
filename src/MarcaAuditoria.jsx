import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Table} from "react-bootstrap";

export function MarcaAuditoria() {

    useEffect(() => {
        getMarcas();
    }, []);

    const [marcas, setMarcas] = useState([]);

    const getMarcas = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/admin/marcas/auditoria");
            setMarcas(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER MARCAS: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    return (
        <div className={"text-center mt-3"}>
            <h1>AUDITORIA MARCAS</h1>
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
                {marcas.map((marca, indice) => (
                    <tr key={indice}>
                        <td>{marca.id}</td>
                        <td>{marca.nombre}</td>
                        <td>{marca.descripcion}</td>
                        <td>{marca.createdBy}</td>
                        <td>{marca.createdAt}</td>
                        <td>{marca.updatedBy}</td>
                        <td>{marca.updatedAt}</td>
                        <td>{marca.deletedAt}</td>
                        <td>{marca.estado}</td>
                    </tr>
                ))}
            </Table>
        </div>
    )
}