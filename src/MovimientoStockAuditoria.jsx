import React from "react";
import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Form, Table} from "react-bootstrap";

export function MovimientoStockAuditoria() {

    useEffect(() => {
        getMovimientosStock();
        getProductos();
    }, []);

    const [movimientosStock, setMovimientosStock] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [productSearchTerm, setProductSearchTerm] = useState("");
    const [productos, setProductos] = useState([]);

    const getMovimientosStock = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/admin/movimientoStock/auditoria");
            setMovimientosStock(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER MOVIMIENTOS DE STOCK: ${error.response && error.response.status === 403 ? "\nNO TIENE LOS PERMISOS SUFICIENTES" : `\n${error.response.data.message}`}`);
        }
    }

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

    const handleProductSearchChange = (event) => {
        setProductSearchTerm(event.target.value);
    };

    const filteredMovimientosStock = movimientosStock.filter(movimientoStock => {
        const productoAsociado = productos.find(producto =>
            producto.movimientos.some(movimiento => movimiento.id === movimientoStock.id)
        );
        return movimientoStock.id.toString().includes(searchTerm) && (productoAsociado ? productoAsociado.nombre.toLowerCase().includes(productSearchTerm.toLowerCase()) : false);
    });

    return (
        <div className={"text-center mt-3"}>
            <h1>AUDITORIA MOVIMIENTOS DE STOCK</h1>
            <Form.Control
                type="number"
                placeholder="Buscar por Id"
                value={searchTerm}
                onChange={handleSearchChange}
                className={"mt-3"}
            />
            <Form.Control
                type="text"
                placeholder="Buscar por nombre del producto asociado"
                value={productSearchTerm}
                onChange={handleProductSearchChange}
                className={"mt-3"}
            />
            <Table className={"mt-3"} bordered>

                <thead>
                <tr>
                    <th>Id</th>
                    <th>Cantidad</th>
                    <th>Motivo</th>
                    <th>Tipo de movimiento</th>
                    <th>Creado por</th>
                    <th>Fecha movimiento</th>
                    <th>Hora movimiento</th>
                    <th>Producto asociado</th>
                </tr>
                </thead>
                <tbody>
                {filteredMovimientosStock.map((movimientoStock, indice) => {
                    const productoAsociado = productos.find(producto =>
                        producto.movimientos.some(movimiento => movimiento.id === movimientoStock.id)
                    );
                    return (
                        <tr key={indice}>
                            <td>{movimientoStock.id}</td>
                            <td>{movimientoStock.cantidad}</td>
                            <td>{movimientoStock.motivo}</td>
                            <td>{movimientoStock.tipoMovimiento}</td>
                            <td>{movimientoStock.createdBy}</td>
                            <td>{movimientoStock.fechaMovimiento}</td>
                            <td>{movimientoStock.horaMovimiento}</td>
                            <td>{productoAsociado ? productoAsociado.nombre : "No asociado"}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </div>
    )
}