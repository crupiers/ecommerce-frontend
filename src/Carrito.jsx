import {Button, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Link} from "react-router-dom";

export function Carrito() {

    useEffect(() => {
        getProductos();
    }, []);

    const [productos, setProductos] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const getProductos = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/productos");
            setProductos(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER PRODUCTOS: \n${error.response.data.message}`);
        }
    }

    function handleEliminar(index) {
        const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        window.location.reload();
    }

    async function handleAceptarPedido() {
        setIsProcessing(true);

        const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

        try {
            const detallesPedido = await Promise.all(carrito.map(async (item) => {
                const response = await AXIOS_CLIENT.post("/detallesPedidos", {
                    cantidad: item.cantidad,
                    idProducto: item.idProducto
                });
                return response.data;
            }));

            await AXIOS_CLIENT.post("/pedidos", {
                idDetallesPedido: detallesPedido.map(detalle => detalle.id),
                idUsuario: localStorage.getItem("userId")
            })

            alert("PEDIDO ACEPTADO CON ÉXITO");
            localStorage.setItem("carrito", JSON.stringify([]));
            window.location.href = "/catalogo";
        } catch (error) {
            alert(`ERROR AL ACEPTAR PEDIDO: \n${error.response.data.message}`);
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <>
            <div className={"text-center mt-3"}>
                <h1 className={"text-center mt-3"}>
                    CARRITO
                </h1>
                <Table className={"mt-3"} bordered responsive>
                    <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    {JSON.parse(localStorage.getItem("carrito") || "[]").map((item, index) => {
                        const productoAsociado = productos.find(producto => producto.id === item.idProducto);
                        return (
                            <tr key={index}>
                                <td>{productoAsociado?.nombre}</td>
                                <td>{item.cantidad}</td>
                                <td>${item.cantidad * productoAsociado?.precio}</td>
                                <td>
                                    <Link to="#" className={"bg-transparent text-danger"}
                                          onClick={() => handleEliminar(index)}>Eliminar</Link>
                                </td>
                            </tr>
                        );
                    })}
                </Table>
            </div>
            <div className={"text-black fw-bold d-flex justify-content-between"}>
                <h3>
                    TOTAL: ${JSON.parse(localStorage.getItem("carrito") || "[]").reduce((acc, item) => {
                        const productoAsociado = productos.find(producto => producto.id === item.idProducto);
                        return acc + (item.cantidad * productoAsociado?.precio);
                    }
                    , 0)}
                </h3>
                <Button onClick={handleAceptarPedido} disabled={isProcessing}>
                    {isProcessing ? "Procesando..." : "Aceptar Pedido"}
                </Button>
            </div>
        </>
    );
}