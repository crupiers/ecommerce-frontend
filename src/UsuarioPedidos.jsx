import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Table, Button, Modal} from "react-bootstrap";

export function UsuarioPedidos() {

    const [pedidos, setPedidos] = useState([]);
    const [detallesPedidos, setDetallesPedidos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [detallesPedidoSeleccionado, setDetallesPedidoSeleccionado] = useState([]);

    useEffect(() => {
        getPedidos();
        getDetallesPedidos();
        getProductos();
    }, []);

    const getProductos = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/productos");
            setProductos(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER PRODUCTOS: \n${error.response.data.message}`);
        }
    }

    const getPedidos = async () => {
        const idUsuario = localStorage.getItem("userId");
        try {
            const value = await AXIOS_CLIENT.get(`/pedidos/porUsuario/${idUsuario}`);
            setPedidos(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER PEDIDOS: \n${error.response.data.message}`);
        }
    }

    const getDetallesPedidos = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/detallesPedidos");
            setDetallesPedidos(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER DETALLES DE PEDIDOS: \n${error.response.data.message}`);
        }
    }

    const handleShowDetalles = (idDetallesPedido) => {
        const detalles = detallesPedidos.filter(detalle => idDetallesPedido.some(id => id === detalle.id));
        setDetallesPedidoSeleccionado(detalles);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const getNombreProducto = (idProducto) => {
        const producto = productos.find(producto => producto.id === idProducto);
        return producto ? producto.nombre : "Producto no encontrado";
    }

    return (
        <div className={"text-center mt-3"}>
            <h1>PEDIDOS</h1>
            <Table className={"mt-3"} bordered responsive>
                <thead>
                <tr>
                    <th className="text-center align-middle">Id</th>
                    <th className="text-center align-middle">Hora pedido</th>
                    <th className="text-center align-middle">Fecha pedido</th>
                    <th className="text-center align-middle">Detalles</th>
                    <th className="text-center align-middle">Total</th>
                </tr>
                </thead>
                <tbody>
                {pedidos.map((pedido, indice) => (
                    <tr key={indice}>
                        <td className="text-center align-middle">{pedido.id}</td>
                        <td className="text-center align-middle">{pedido.horaPedido}</td>
                        <td className="text-center align-middle">{pedido.fechaPedido}</td>
                        <td className="text-center align-middle">
                            <Button variant="primary" onClick={() => handleShowDetalles(pedido.idDetallesPedido)}>
                                Ver Detalles
                            </Button>
                        </td>
                        <td className="text-center align-middle">${pedido.total}</td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalles del Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table bordered responsive>
                        <thead>
                        <tr>
                            <th className="text-center align-middle">Id</th>
                            <th className="text-center align-middle">Producto</th>
                            <th className="text-center align-middle">Cantidad</th>
                            <th className="text-center align-middle">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {detallesPedidoSeleccionado.map((detalle, indice) => (
                            <tr key={indice}>
                                <td className="text-center align-middle">{detalle.id}</td>
                                <td className="text-center align-middle">{getNombreProducto(detalle.idProducto)}</td>
                                <td className="text-center align-middle">{detalle.cantidad}</td>
                                <td className="text-center align-middle">${detalle.subtotal}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}