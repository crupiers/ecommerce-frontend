import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Form, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

export function ProductoAuditoria() {
    useEffect(() => {
        getProductos();
    }, []);

    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getProductos = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/admin/productos/auditoria");
            setProductos(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER PRODUCTOS: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProductos = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const eliminarProducto = async (id) => {
        try {
            await AXIOS_CLIENT.delete(`/productos/${id}`);
            alert("PRODUCTO ELIMINADO CON ÉXITO");
            getProductos();
        } catch (error) {
            alert(`ERROR AL ELIMINAR PRODUCTO: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    const activarProducto = async (id) => {
        try {
            await AXIOS_CLIENT.put(`/productos/recuperar/${id}`);
            alert("PRODUCTO ACTIVADO CON ÉXITO");
            getProductos();
        } catch (error) {
            alert(`ERROR AL ACTIVAR PRODUCTO: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

    return (
        <div className={"text-center mt-3"}>
            <h1>AUDITORIA PRODUCTOS</h1>
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
                    <th>Precio</th>
                    <th>Umbral</th>
                    <th>Stock</th>
                    <th>Categoria</th>
                    <th>Marca</th>
                    <th>Tamaño</th>
                    <th>Color</th>
                    <th>C. Barra</th>
                    <th>Movimiento Stock (Id)</th>
                    <th>Creado por</th>
                    <th>Creado en</th>
                    <th>Actualizado por</th>
                    <th>Actualizado en</th>
                    <th>Borrado en</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
                </thead>
                {filteredProductos.map((producto, indice) => (
                    <tr key={indice}>
                        <td>{producto.id}</td>
                        <td>{producto.nombre}</td>
                        <td>{producto.descripcion}</td>
                        <td>{producto.precio}</td>
                        <td>{producto.umbral}</td>
                        <td>{producto.stock}</td>
                        <td>{producto.nombreCategoria}</td>
                        <td>{producto.nombreMarca}</td>
                        <td>{producto.nombreTamanio}</td>
                        <td>{producto.nombreColor}</td>
                        <td>{producto.codigoBarra}</td>
                        <td>
                            {producto.movimientos.length > 0 ?
                                producto.movimientos.map(movimiento => movimiento.id).join(", ") :
                                "No hay movimientos"
                            }
                        </td>
                        <td>{producto.createdBy}</td>
                        <td>{producto.createdAt}</td>
                        <td>{producto.updatedBy}</td>
                        <td>{producto.updatedAt}</td>
                        <td>{producto.deletedAt === null ? "N/A" : producto.deletedAt}</td>
                        <td>{producto.estado === 0 ? "ACTIVO" : "ELIMINADO"}</td>
                        {
                            <td>
                                {
                                    producto.estado === 0 ?
                                        <Link to="#" className={"bg-transparent text-danger"}
                                              onClick={() => eliminarProducto(producto.id)}>Eliminar</Link>
                                        :
                                        <Link to="#" className={"bg-transparent text-success"}
                                              onClick={() => activarProducto(producto.id)}>Activar</Link>
                                }
                            </td>
                        }
                    </tr>
                ))}
            </Table>
        </div>
    )
}