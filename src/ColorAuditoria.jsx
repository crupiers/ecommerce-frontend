import {Table} from "react-bootstrap";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {useEffect, useState} from "react";

export function ColorAuditoria() {

    useEffect(() => {
        getColores();
    }, []);

    const [colores, setColores] = useState([]);

    const getColores = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/colores/auditoria");
            setColores(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER COLORES: \n${error.response.data.message}`);
        }
    }

    return (
        <Table className={"mt-5"} bordered>
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
            {colores.map((color, indice) => (
                <tr key={indice}>
                    <td>{color.id}</td>
                    <td>{color.nombre}</td>
                    <td>{color.descripcion}</td>
                    <td>{color.createdBy}</td>
                    <td>{color.createdAt}</td>
                    <td>{color.updatedBy}</td>
                    <td>{color.updatedAt}</td>
                    <td>{color.deletedAt}</td>
                    <td>{color.estado}</td>
                </tr>
            ))}
        </Table>
    )
}
