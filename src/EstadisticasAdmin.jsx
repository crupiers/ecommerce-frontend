import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Bar, Pie} from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement} from "chart.js";
import {Table} from "react-bootstrap";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export function EstadisticasAdmin() {

    useEffect(() => {
        getPedidos();
        getDetallesPedidos();
        getProductos();
    }, []);

    const [pedidos, setPedidos] = useState([]);
    const [detallesPedidos, setDetallesPedidos] = useState([]);
    const [productos, setProductos] = useState([]);
    const [dataMarca, setDataMarca] = useState({});
    const [dataCategoria, setDataCategoria] = useState({});
    const [dataPieMarca, setDataPieMarca] = useState({});
    const [dataPieCategoria, setDataPieCategoria] = useState({});
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [topNMarcas, setTopNMarcas] = useState(3);
    const [topNCategorias, setTopNCategorias] = useState(3);
    const [selectedMarca, setSelectedMarca] = useState("");
    const [selectedCategoria, setSelectedCategoria] = useState("");
    const [cantidadProductosMarca, setCantidadProductosMarca] = useState(5);
    const [cantidadProductosCategoria, setCantidadProductosCategoria] = useState(5);

    const getProductos = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/productos");
            setProductos(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER PRODUCTOS: \n${error.response.data.message}`);
        }
    }

    const getPedidos = async () => {
        try {
            const value = await AXIOS_CLIENT.get(`/pedidos`);
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
            const productosPorMarca = {};
            const productosPorCategoria = {};

            const fechaInicioDate = new Date(fechaInicio);
            const fechaFinDate = new Date(fechaFin);

            pedidos.forEach(pedido => {
                const [dia, mes, anio] = pedido.fechaPedido.split("/");
                const fechaPedido = new Date(`${anio}-${mes}-${dia}`);
                if (fechaPedido >= fechaInicioDate && fechaPedido <= fechaFinDate) {
                    pedido.idDetallesPedido.forEach(idDetalle => {
                        const detalle = detallesPedidos.find(d => d.id === idDetalle);
                        if (detalle) {
                            const producto = productos.find(p => p.id === detalle.idProducto);
                            if (producto) {
                                if (!productosPorMarca[producto.nombreMarca]) {
                                    productosPorMarca[producto.nombreMarca] = 0;
                                }
                                productosPorMarca[producto.nombreMarca] += detalle.cantidad;

                                if (!productosPorCategoria[producto.nombreCategoria]) {
                                    productosPorCategoria[producto.nombreCategoria] = 0;
                                }
                                productosPorCategoria[producto.nombreCategoria] += detalle.cantidad;
                            }
                        }
                    });
                }
            });

            setDataMarca({
                labels: Object.keys(productosPorMarca),
                datasets: [
                    {
                        label: 'Cantidad de productos vendidos',
                        data: Object.values(productosPorMarca),
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderWidth: 1
                    }
                ]
            });

            setDataCategoria({
                labels: Object.keys(productosPorCategoria),
                datasets: [
                    {
                        label: 'Cantidad de productos vendidos',
                        data: Object.values(productosPorCategoria),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            });

            const topMarcas = Object.entries(productosPorMarca)
                .sort((a, b) => b[1] - a[1])
                .slice(0, topNMarcas);
            const otrasMarcas = Object.entries(productosPorMarca)
                .sort((a, b) => b[1] - a[1])
                .slice(topNMarcas)
                .reduce((acc, [key, value]) => acc + value, 0);

            const topCategorias = Object.entries(productosPorCategoria)
                .sort((a, b) => b[1] - a[1])
                .slice(0, topNCategorias);
            const otrasCategorias = Object.entries(productosPorCategoria)
                .sort((a, b) => b[1] - a[1])
                .slice(topNCategorias)
                .reduce((acc, [key, value]) => acc + value, 0);

            setDataPieMarca({
                labels: [...topMarcas.map(([key]) => key), 'Otras'],
                datasets: [
                    {
                        data: [...topMarcas.map(([, value]) => value), otrasMarcas],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CCCCCC'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CCCCCC']
                    }
                ]
            });

            setDataPieCategoria({
                labels: [...topCategorias.map(([key]) => key), 'Otras'],
                datasets: [
                    {
                        data: [...topCategorias.map(([, value]) => value), otrasCategorias],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CCCCCC'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CCCCCC']
                    }
                ]
            });
        }
    }, [productos, pedidos, detallesPedidos, fechaInicio, fechaFin, topNMarcas, topNCategorias]);

    const handleFechaInicioChange = (e) => {
        setFechaInicio(e.target.value);
    }

    const handleFechaFinChange = (e) => {
        setFechaFin(e.target.value);
    }

    const handleTopNMarcasChange = (e) => {
        setTopNMarcas(Number(e.target.value));
    }

    const handleTopNCategoriasChange = (e) => {
        setTopNCategorias(Number(e.target.value));
    }

    const handleSelectedMarcaChange = (e) => {
        setSelectedMarca(e.target.value);
    }

    const handleSelectedCategoriaChange = (e) => {
        setSelectedCategoria(e.target.value);
    }

    const handleCantidadProductosMarcaChange = (e) => {
        setCantidadProductosMarca(Number(e.target.value));
    }

    const handleCantidadProductosCategoriaChange = (e) => {
        setCantidadProductosCategoria(Number(e.target.value));
    }

    const noData = !dataMarca.labels?.length && !dataCategoria.labels?.length;

    const productosMasVendidosPorMarca = productos
        .filter(producto => producto.nombreMarca === selectedMarca)
        .map(producto => {
            const cantidadVendida = detallesPedidos
                .filter(detalle => detalle.idProducto === producto.id)
                .reduce((acc, detalle) => acc + detalle.cantidad, 0);
            return {...producto, cantidadVendida};
        })
        .sort((a, b) => b.cantidadVendida - a.cantidadVendida)
        .slice(0, cantidadProductosMarca);

    const productosMasVendidosPorCategoria = productos
        .filter(producto => producto.nombreCategoria === selectedCategoria)
        .map(producto => {
            const cantidadVendida = detallesPedidos
                .filter(detalle => detalle.idProducto === producto.id)
                .reduce((acc, detalle) => acc + detalle.cantidad, 0);
            return {...producto, cantidadVendida};
        })
        .sort((a, b) => b.cantidadVendida - a.cantidadVendida)
        .slice(0, cantidadProductosCategoria);

    return (
        <div className={"text-center mt-3"}>
            <h1 className={"mb-4"}>ESTADÍSTICAS ADMIN</h1>
            <div className={"mb-3"}>
                <label className={"me-2"}>Fecha Inicio:</label>
                <input type="date" value={fechaInicio} onChange={handleFechaInicioChange}/>
                <label className={"ms-3 me-2"}>Fecha Fin:</label>
                <input type="date" value={fechaFin} onChange={handleFechaFinChange}/>
            </div>
            {noData ? (
                <div className={"text-center mt-5"}>
                    <h2>Por favor, ingresar una fecha válida.</h2>
                </div>
            ) : (
                <>
                    {dataMarca.labels && dataMarca.labels.length > 0 && (
                        <>
                            <Bar
                                data={dataMarca}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {position: 'top'},
                                        title: {display: true, text: 'Productos más vendidos por Marca'}
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
                                    Se suman la cantidad de productos vendidos por marca de todos los pedidos
                                </span>
                            </div>
                        </>
                    )}
                    {dataCategoria.labels && dataCategoria.labels.length > 0 && (
                        <>
                            <Bar
                                data={dataCategoria}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {position: 'top'},
                                        title: {display: true, text: 'Productos más vendidos por Categoría'}
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
                                    Se suman la cantidad de productos vendidos por categoría de todos los pedidos
                                </span>
                            </div>
                        </>
                    )}
                    {dataPieMarca.labels && dataPieMarca.labels.length > 0 && (
                        <div className={"mb-5"} style={{width: '80%', height: '500px', margin: '0 auto'}}>
                            <Pie
                                data={dataPieMarca}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {position: 'top'},
                                        title: {display: true, text: `Top ${topNMarcas} Marcas con más productos vendidos`}
                                    }
                                }}
                            />
                        </div>
                    )}
                    {dataPieCategoria.labels && dataPieCategoria.labels.length > 0 && (
                        <div className={"mb-5"} style={{width: '80%', height: '500px', margin: '0 auto'}}>
                            <Pie
                                data={dataPieCategoria}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {position: 'top'},
                                        title: {
                                            display: true,
                                            text: `Top ${topNCategorias} Categorías con más productos vendidos`
                                        }
                                    }
                                }}
                            />
                        </div>
                    )}
                    <div className={"mb-5"}>
                        <h2 className={"mb-4"}>PRODUCTOS MÁS VENDIDOS DE UNA MARCA</h2>
                        <label className={"me-2"}>Marca:</label>
                        <select value={selectedMarca} onChange={handleSelectedMarcaChange}>
                            <option value="">Seleccionar Marca</option>
                            {dataMarca.labels?.map((marca, index) => (
                                <option key={index} value={marca}>{marca}</option>
                            ))}
                        </select>
                        <label className={"ms-3 me-2"}>Cantidad de Productos:</label>
                        <input type="number" value={cantidadProductosMarca} onChange={handleCantidadProductosMarcaChange}
                               min="1"/>
                        <Table striped bordered hover className={"mt-3"}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Cantidad Vendida</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productosMasVendidosPorMarca.map((producto, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.cantidadVendida}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>


                    <div className={"mb-4"}>
                        <h2 className={"mb-4"}>PRODUCTOS MÁS VENDIDOS DE UNA CATEGORÍA</h2>
                        <label className={"me-2"}>Categoría:</label>
                        <select value={selectedCategoria} onChange={handleSelectedCategoriaChange}>
                            <option value="">Seleccionar Categoría</option>
                            {dataCategoria.labels?.map((categoria, index) => (
                                <option key={index} value={categoria}>{categoria}</option>
                            ))}
                        </select>
                        <label className={"ms-3 me-2"}>Cantidad de Productos:</label>
                        <input type="number" value={cantidadProductosCategoria} onChange={handleCantidadProductosCategoriaChange}
                               min="1"/>
                        <Table striped bordered hover className={"mt-3"}>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Cantidad Vendida</th>
                            </tr>
                            </thead>
                            <tbody>
                            {productosMasVendidosPorCategoria.map((producto, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.cantidadVendida}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>


                </>
            )}
        </div>
    );
}