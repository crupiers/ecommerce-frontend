import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function EstadisticasUsuario() {

    useEffect(() => {
        getPedidos();
        getDetallesPedidos();
        getProductos();
    }, []);

    const [pedidos, setPedidos] = useState([]);
    const [detallesPedidos, setDetallesPedidos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [dataCantidad, setDataCantidad] = useState({});
    const [dataMonto, setDataMonto] = useState({});
    const [dataMarca, setDataMarca] = useState({});
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

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

    useEffect(() => {
        if (productos.length > 0 && pedidos.length > 0 && detallesPedidos.length > 0) {
            const pedidosPorCategoria = {};
            const montoPorCategoria = {};
            const productosPorMarca = {};

            const fechaInicioDate = new Date(fechaInicio);
            const fechaFinDate = new Date(fechaFin);

            pedidos.forEach(pedido => {
                const [dia, mes, anio] = pedido.fechaPedido.split("/");
                const fechaPedido = new Date(`${anio}-${mes}-${dia}`);
                if (fechaPedido >= fechaInicioDate && fechaPedido <= fechaFinDate) {
                    const categoriasEnPedido = new Set();
                    pedido.idDetallesPedido.forEach(idDetalle => {
                        const detalle = detallesPedidos.find(d => d.id === idDetalle);
                        if (detalle) {
                            const producto = productos.find(p => p.id === detalle.idProducto);
                            if (producto) {
                                categoriasEnPedido.add(producto.nombreCategoria);
                                if (!montoPorCategoria[producto.nombreCategoria]) {
                                    montoPorCategoria[producto.nombreCategoria] = 0;
                                }
                                montoPorCategoria[producto.nombreCategoria] += detalle.subtotal;

                                if (!productosPorMarca[producto.nombreMarca]) {
                                    productosPorMarca[producto.nombreMarca] = 0;
                                }
                                productosPorMarca[producto.nombreMarca] += detalle.cantidad;
                            }
                        }
                    });
                    categoriasEnPedido.forEach(categoria => {
                        if (!pedidosPorCategoria[categoria]) {
                            pedidosPorCategoria[categoria] = 0;
                        }
                        pedidosPorCategoria[categoria]++;
                    });
                }
            });

            setDataCantidad({
                labels: Object.keys(pedidosPorCategoria),
                datasets: [
                    {
                        label: 'Cantidad de pedidos',
                        data: Object.values(pedidosPorCategoria),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            });

            setDataMonto({
                labels: Object.keys(montoPorCategoria),
                datasets: [
                    {
                        label: 'Monto total gastado',
                        data: Object.values(montoPorCategoria),
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }
                ]
            });

            setDataMarca({
                labels: Object.keys(productosPorMarca),
                datasets: [
                    {
                        label: 'Cantidad de productos comprados',
                        data: Object.values(productosPorMarca),
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    }
                ]
            });
        }
    }, [productos, pedidos, detallesPedidos, fechaInicio, fechaFin]);

    const handleFechaInicioChange = (e) => {
        setFechaInicio(e.target.value);
    }

    const handleFechaFinChange = (e) => {
        setFechaFin(e.target.value);
    }

    const noData = !dataCantidad.labels?.length && !dataMonto.labels?.length && !dataMarca.labels?.length;

    return (
        <div className={"text-center mt-3"}>
            <h1 className={"mb-4"}>ESTADÍSTICAS</h1>
            <div className={"mb-3"}>
                <label className={"me-2"}>Fecha Inicio:</label>
                <input type="date" value={fechaInicio} onChange={handleFechaInicioChange} />
                <label className={"ms-3 me-2"}>Fecha Fin:</label>
                <input type="date" value={fechaFin} onChange={handleFechaFinChange} />
            </div>
            {noData ? (
                <div className={"text-center mt-5"}>
                    <h2>Por favor, ingresar una fecha válida.</h2>
                </div>
            ) : (
                <>
                    {dataCantidad.labels && dataCantidad.labels.length > 0 && (
                        <>
                            <Bar
                                data={dataCantidad}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {position: 'top'},
                                        title: {display: true, text: 'Cantidad de pedidos por Categoría'}
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                stepSize: 1
                                            }
                                        }
                                    }
                                }}
                            />
                            <div className={"mb-5 mt-2"}>
                                <span className={"fw-light card d-inline-block"} style={{padding: "8px"}}>
                                    Si un pedido tiene un item de cierta categoria (sin importar los demas items), este se cuenta para el recuento de pedidos de dicha categoria
                                </span>
                            </div>
                        </>
                    )}
                    {dataMonto.labels && dataMonto.labels.length > 0 && (
                        <>
                            <Bar
                                data={dataMonto}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {position: 'top'},
                                        title: {display: true, text: 'Monto total gastado por Categoría'}
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                stepSize: 1000
                                            }
                                        }
                                    }
                                }}
                            />
                            <div className={"mb-5 mt-2"}>
                                <span className={"fw-light card d-inline-block"} style={{padding: "8px"}}>
                                    Se suman los subtotales de los pedidos de items de cierta categoria
                                </span>
                            </div>
                        </>
                    )}
                    {dataMarca.labels && dataMarca.labels.length > 0 && (
                        <>
                            <Bar
                                data={dataMarca}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {position: 'top'},
                                        title: {display: true, text: 'Cantidad de productos comprados por Marca'}
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                stepSize: 1
                                            }
                                        }
                                    }
                                }}
                            />
                            <div className={"mb-5 mt-2"}>
                                <span className={"fw-light card d-inline-block"} style={{padding: "8px"}}>
                                    Se suman la cantidad de productos por marca de todos los pedidos
                                </span>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}