import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Form, Table} from "react-bootstrap";


export function ProductoListar() {
    const url = "/productos";

    const [productos, setProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = async () => {
        try {
            const value = await AXIOS_CLIENT.get(url);
            setProductos(value.data);
        } catch (error) {
            console.error("ERROR AL OBTENER PRODUCTOS", error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProductos = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={"text-center mt-3"}>
            <h1>LISTA PRODUCTOS</h1>
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
                    <th>Precio</th>
                    <th>Umbral</th>
                    <th>Stock</th>
                    <th>Categoria</th>
                    <th>Marca</th>
                    <th>Tamaño</th>
                    <th>Color</th>
                    <th>Código de barra</th>
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
                    </tr>
                ))}
            </Table>
        </div>
    )
}