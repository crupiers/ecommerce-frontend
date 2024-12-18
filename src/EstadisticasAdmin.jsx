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
    const [dataMontoMarca, setDataMontoMarca] = useState({});
    const [dataMontoCategoria, setDataMontoCategoria] = useState({});
    const [dataPieMarca, setDataPieMarca] = useState({});
    const [dataPieCategoria, setDataPieCategoria] = useState({});
    const [dataMontoPieMarca, setDataMontoPieMarca] = useState({});
    const [dataMontoPieCategoria, setDataMontoPieCategoria] = useState({});
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
            const montoPorMarca = {};
            const montoPorCategoria = {};

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
                                    montoPorMarca[producto.nombreMarca] = 0;
                                }
                                if (!productosPorCategoria[producto.nombreCategoria]) {
                                    productosPorCategoria[producto.nombreCategoria] = 0;
                                    montoPorCategoria[producto.nombreCategoria] = 0;
                                }
                                productosPorMarca[producto.nombreMarca] += detalle.cantidad;
                                productosPorCategoria[producto.nombreCategoria] += detalle.cantidad;
                                montoPorMarca[producto.nombreMarca] += detalle.cantidad * producto.precio;
                                montoPorCategoria[producto.nombreCategoria] += detalle.cantidad * producto.precio;
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

            setDataMontoMarca({
                labels: Object.keys(montoPorMarca),
                datasets: [
                    {
                        label: 'Monto total recaudado',
                        data: Object.values(montoPorMarca),
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }
                ]
            });

            setDataMontoCategoria({
                labels: Object.keys(montoPorCategoria),
                datasets: [
                    {
                        label: 'Monto total recaudado',
                        data: Object.values(montoPorCategoria),
                        backgroundColor: 'rgba(255, 206, 86, 0.2)',
                        borderColor: 'rgba(255, 206, 86, 1)',
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
                .reduce((acc, [, value]) => acc + value, 0);

            const topCategorias = Object.entries(productosPorCategoria)
                .sort((a, b) => b[1] - a[1])
                .slice(0, topNCategorias);
            const otrasCategorias = Object.entries(productosPorCategoria)
                .sort((a, b) => b[1] - a[1])
                .slice(topNCategorias)
                .reduce((acc, [, value]) => acc + value, 0);

            setDataPieMarca({
                labels: [...topMarcas.map(([key]) => key), 'Otras'],
                datasets: [
                    {
                        data: [...topMarcas.map(([, value]) => value), otrasMarcas],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CCCCCC', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF', '#36A2EB'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CCCCCC', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF', '#36A2EB']
                    }
                ]
            });

            setDataPieCategoria({
                labels: [...topCategorias.map(([key]) => key), 'Otras'],
                datasets: [
                    {
                        data: [...topCategorias.map(([, value]) => value), otrasCategorias],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CCCCCC', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF', '#36A2EB'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CCCCCC', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF', '#36A2EB']
                    }
                ]
            });

            const topMontoMarcas = Object.entries(montoPorMarca)
                .sort((a, b) => b[1] - a[1])
                .slice(0, topNMarcas);
            const otrasMontoMarcas = Object.entries(montoPorMarca)
                .sort((a, b) => b[1] - a[1])
                .slice(topNMarcas)
                .reduce((acc, [, value]) => acc + value, 0);

            const topMontoCategorias = Object.entries(montoPorCategoria)
                .sort((a, b) => b[1] - a[1])
                .slice(0, topNCategorias);
            const otrasMontoCategorias = Object.entries(montoPorCategoria)
                .sort((a, b) => b[1] - a[1])
                .slice(topNCategorias)
                .reduce((acc, [, value]) => acc + value, 0);

            setDataMontoPieMarca({
                labels: [...topMontoMarcas.map(([key]) => key), 'Otras'],
                datasets: [
                    {
                        data: [...topMontoMarcas.map(([, value]) => value), otrasMontoMarcas],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CCCCCC', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF', '#36A2EB'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CCCCCC', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF', '#36A2EB']
                    }
                ]
            });

            setDataMontoPieCategoria({
                labels: [...topMontoCategorias.map(([key]) => key), 'Otras'],
                datasets: [
                    {
                        data: [...topMontoCategorias.map(([, value]) => value), otrasMontoCategorias],
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CCCCCC', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF', '#36A2EB'],
                        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#CCCCCC', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#C9CBCF', '#36A2EB']
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
                            <Bar className={"mb-5"}
                                 data={dataMarca}
                                 options={{
                                     responsive: true,
                                     plugins: {
                                         legend: {
                                             position: 'top',
                                         },
                                         title: {
                                             display: true,
                                             text: 'Cantidad de productos vendidos por marca'
                                         },
                                     },
                                 }}
                            />
                        </>
                    )}
                    {dataCategoria.labels && dataCategoria.labels.length > 0 && (
                        <>
                            <Bar className={"mb-5"}
                                 data={dataCategoria}
                                 options={{
                                     responsive: true,
                                     plugins: {
                                         legend: {
                                             position: 'top',
                                         },
                                         title: {
                                             display: true,
                                             text: 'Cantidad de productos vendidos por categoría'
                                         },
                                     },
                                 }}
                            />
                        </>
                    )}
                    {dataMontoMarca.labels && dataMontoMarca.labels.length > 0 && (
                        <>
                            <Bar className={"mb-5"}
                                 data={dataMontoMarca}
                                 options={{
                                     responsive: true,
                                     plugins: {
                                         legend: {
                                             position: 'top',
                                         },
                                         title: {
                                             display: true,
                                             text: 'Monto total recaudado por marca'
                                         },
                                     },
                                 }}
                            />
                        </>
                    )}
                    {dataMontoCategoria.labels && dataMontoCategoria.labels.length > 0 && (
                        <>
                            <Bar className={"mb-5"}
                                 data={dataMontoCategoria}
                                 options={{
                                     responsive: true,
                                     plugins: {
                                         legend: {
                                             position: 'top',
                                         },
                                         title: {
                                             display: true,
                                             text: 'Monto total recaudado por categoría'
                                         },
                                     },
                                 }}
                            />
                        </>
                    )}
                    {dataPieMarca.labels && dataPieMarca.labels.length > 0 && (
                        <div className="text-center">
                            <div className={"mb-3 mt-3"}>
                                <label className={"me-2"}>Top Nº Marcas:</label>
                                <input type="number" value={topNMarcas} onChange={handleTopNMarcasChange} min="1"/>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                                <div className={"mb-5"} style={{width: '40%', height: '500px'}}>
                                    <Pie
                                        data={dataPieMarca}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Distribución de Ventas por Marca',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                <div className={"mb-5"} style={{width: '40%', height: '500px'}}>
                                    <Pie
                                        data={dataMontoPieMarca}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Monto Total Recaudado por Marca',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {dataPieCategoria.labels && dataPieCategoria.labels.length > 0 && (
                        <div className="text-center">
                            <div className={"mb-3 mt-3"}>
                                <label className={"me-2"}>Top Nº Categorías:</label>
                                <input type="number" value={topNCategorias} onChange={handleTopNCategoriasChange}
                                       min="1"/>
                            </div>
                            <div className={"d-flex justify-content-center align-items-center"}>
                                <div className={"mb-5"} style={{width: '40%', height: '500px'}}>
                                    <Pie
                                        data={dataPieCategoria}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Distribución de Ventas por Categoría',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                                <div className={"mb-5"} style={{width: '40%', height: '500px'}}>
                                    <Pie
                                        data={dataMontoPieCategoria}
                                        options={{
                                            responsive: true,
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Monto Total Recaudado por Categoría',
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
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
                        <input type="number" value={cantidadProductosMarca}
                               onChange={handleCantidadProductosMarcaChange}
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
                        <input type="number" value={cantidadProductosCategoria}
                               onChange={handleCantidadProductosCategoriaChange}
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