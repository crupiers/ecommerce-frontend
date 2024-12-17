import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Table, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

export function MarcaAuditoria() {

    const [marcas, setMarcas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getMarcas();
    }, []);

    const getMarcas = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/admin/marcas/auditoria");
            setMarcas(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER MARCAS: \n${error.response.data.message}`);
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const filteredMarcas = marcas.filter(marca =>
        marca.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const eliminarMarca = async (id) => {
        try {
            await AXIOS_CLIENT.delete(`/marcas/${id}`);
            alert("MARCA ELIMINADO CON ÉXITO");
            getMarcas();
        } catch (error) {
            alert(`ERROR AL ELIMINAR MARCA: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    const activarMarca = async (id) => {
        try {
            await AXIOS_CLIENT.put(`/marcas/recuperar/${id}`);
            alert("MARCA ACTIVADO CON ÉXITO");
            getMarcas();
        } catch (error) {
            alert(`ERROR AL ACTIVAR MARCA: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    return (
        <div className={"text-center mt-3"}>
            <h1>AUDITORIA MARCAS</h1>
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
                {filteredMarcas.map((marca, indice) => (
                    <tr key={indice}>
                        <td>{marca.id}</td>
                        <td>{marca.nombre}</td>
                        <td>{marca.descripcion}</td>
                        <td>{marca.createdBy}</td>
                        <td>{marca.createdAt}</td>
                        <td>{marca.updatedBy}</td>
                        <td>{marca.updatedAt}</td>
                        <td>{marca.deletedAt === null ? "N/A" : marca.deletedAt}</td>
                        <td>{marca.estado === 0 ? "ACTIVO" : "ELIMINADO"}</td>
                        <td>
                            {marca.estado === 0 ? (
                                <Link to="#" className={"bg-transparent text-danger"} onClick={() => eliminarMarca(marca.id)}>Eliminar</Link>
                            ) : (
                                <Link to="#" className={"bg-transparent text-success"} onClick={() => activarMarca(marca.id)}>Activar</Link>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    )
}