import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Table} from "react-bootstrap";

export function CategoriaAuditoria() {

    useEffect(() => {
        getCategorias();
    }, []);

    const [categorias, setCategorias] = useState([]);

    const getCategorias = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/admin/categorias/auditoria");
            setCategorias(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER CATEGORIAS: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    return (
        <div className={"text-center mt-3"}>
            <h1>AUDITORIA CATEGORIAS</h1>
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
                {categorias.map((categoria, indice) => (
                    <tr key={indice}>
                        <td>{categoria.id}</td>
                        <td>{categoria.nombre}</td>
                        <td>{categoria.descripcion}</td>
                        <td>{categoria.createdBy}</td>
                        <td>{categoria.createdAt}</td>
                        <td>{categoria.updatedBy}</td>
                        <td>{categoria.updatedAt}</td>
                        <td>{categoria.deletedAt}</td>
                        <td>{categoria.estado}</td>
                    </tr>
                ))}
            </Table>
        </div>
    )
}