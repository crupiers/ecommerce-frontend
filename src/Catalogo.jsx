import React from "react";
import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {Card, CardImg, Col, Form, Row} from "react-bootstrap";

export function Catalogo() {

    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState(() => {
        const savedCarrito = localStorage.getItem("carrito");
        return savedCarrito ? JSON.parse(savedCarrito) : [];
    });

    const [imagenes, setImagenes] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tamanios, setTamanios] = useState([]);
    const [colores, setColores] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMarca, setSelectedMarca] = useState("");
    const [selectedCategoria, setSelectedCategoria] = useState("");
    const [selectedTamanio, setSelectedTamanio] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    useEffect(() => {
        getProductos();
        getImagenes();
        getMarcas();
        getTamanios();
        getColores();
        getCategorias();
    }, []);

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }, [carrito]);

    const getProductos = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/productos");
            setProductos(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER PRODUCTOS: \n${error.response.data.message}`);
        }
    }

    const getImagenes = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/imagenes");
            setImagenes(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER IMÁGENES: \n${error.response.data.message}`);
        }
    }

    const getMarcas = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/marcas");
            setMarcas(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER MARCAS: \n${error.response.data.message}`);
        }
    }

    const getTamanios = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/tamanios");
            setTamanios(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER TAMAÑOS: \n${error.response.data.message}`);
        }
    }

    const getColores = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/colores");
            setColores(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER COLORES: \n${error.response.data.message}`);
        }
    }

    const getCategorias = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/categorias");
            setCategorias(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER CATEGORÍAS: \n${error.response.data.message}`);
        }
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleMarcaChange = (event) => {
        setSelectedMarca(event.target.value);
    };

    const handleCategoriaChange = (event) => {
        setSelectedCategoria(event.target.value);
    };

    const handleTamanioChange = (event) => {
        setSelectedTamanio(event.target.value);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const filteredProductos = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedMarca === "" || producto.nombreMarca === selectedMarca) &&
        (selectedCategoria === "" || producto.nombreCategoria === selectedCategoria) &&
        (selectedTamanio === "" || producto.nombreTamanio === selectedTamanio) &&
        (selectedColor === "" || producto.nombreColor === selectedColor)
    );

    const handleAgregarCarrito = (productoId, cantidad) => {
        setCarrito(prevCarrito => {
            const productoExistente = prevCarrito.find(item => item.idProducto === productoId);
            if (productoExistente) {
                return prevCarrito.map(item =>
                    item.idProducto === productoId
                        ? {...item, cantidad: parseInt(item.cantidad) + parseInt(cantidad)}
                        : item
                );
            } else {
                return [...prevCarrito, {idProducto: productoId, cantidad: parseInt(cantidad)}];
            }
        });
        alert("PRODUCTO AGREGADO AL CARRITO");
        window.location.reload();
    };

    return (
        <div>
            <h1 className={"text-center mt-3"}>
                CATÁLOGO
            </h1>
            <div className={"d-flex justify-content-center mb-3 mt-3"}>
                <Form.Control type="text" placeholder="Buscar por nombre" value={searchTerm}
                              onChange={handleSearchChange} className={"me-2"}/>
                <Form.Select value={selectedMarca} onChange={handleMarcaChange} className={"me-2"}>
                    <option value="">SELECCIONAR MARCA</option>
                    {marcas.map(marca => (
                        <option key={marca.id} value={marca.nombre}>{marca.nombre}</option>
                    ))}
                </Form.Select>
                <Form.Select value={selectedCategoria} onChange={handleCategoriaChange} className={"me-2"}>
                    <option value="">SELECCIONAR CATEGORÍA</option>
                    {categorias.map(categoria => (
                        <option key={categoria.id} value={categoria.nombre}>{categoria.nombre}</option>
                    ))}
                </Form.Select>
                <Form.Select value={selectedTamanio} onChange={handleTamanioChange} className={"me-2"}>
                    <option value="">SELECCIONAR TAMAÑO</option>
                    {tamanios.map(tamanio => (
                        <option key={tamanio.id} value={tamanio.nombre}>{tamanio.nombre}</option>
                    ))}
                </Form.Select>
                <Form.Select value={selectedColor} onChange={handleColorChange}>
                    <option value="">SELECCIONAR COLOR</option>
                    {colores.map(color => (
                        <option key={color.id} value={color.nombre}>{color.nombre}</option>
                    ))}
                </Form.Select>
            </div>
            <Row className={"d-flex justify-content-center"}>
                {
                    filteredProductos.map(producto => (
                        <Col key={producto.id} xs={12} sm={6} md={4} lg={3} className={"mb-3"}>
                            <Card className={"mt-3 ms-1 me-1"} style={{width: '100%'}}>
                                <CardImg variant={"top"}
                                         src={imagenes.find(img => img.idProducto === producto.id)?.imagenBase64 || "src/assets/exampleImage.svg"}
                                         className={"card-img bg-body-secondary"}
                                         style={{height: '18rem', width: '100%', padding: '15px'}}/>
                                <Card.Body>
                                    <Card.Title>
                                        {producto.nombre}
                                    </Card.Title>
                                    <Card.Text>
                                        {producto.descripcion}
                                    </Card.Text>
                                    <hr/>
                                    <Card.Text>
                                        <span className={"fw-bold"}>CATEGORÍA: </span>
                                        {producto.nombreCategoria}
                                    </Card.Text>
                                    <Card.Text>
                                        <span className={"fw-bold"}>MARCA: </span>
                                        {producto.nombreMarca}
                                    </Card.Text>
                                    <Card.Text>
                                        <span className={"fw-bold"}>TAMAÑO: </span>
                                        {producto.nombreTamanio}
                                    </Card.Text>
                                    <Card.Text>
                                        <span className={"fw-bold"}>COLOR: </span>
                                        {producto.nombreColor}
                                    </Card.Text>
                                    <hr/>
                                    <div className={"d-flex justify-content-between align-items-center"}>
                                        <span className={"fw-bold card"} style={{padding: "5px"}}>${producto.precio}</span>
                                        <span style={{fontSize: "12px"}}>STOCK: {producto.stock}</span>
                                    </div>
                                    <hr/>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        const cantidad = e.target.elements.cantidad.value;
                                        handleAgregarCarrito(producto.id, cantidad);
                                    }}>
                                        <div className={"d-flex justify-content-between align-items-center"}>
                                            <button type={"submit"} className={"btn btn-primary"}>
                                                AGREGAR AL CARRITO
                                            </button>
                                            <input type="number" className={"form-control"} style={{width: "60px"}} min="1"
                                                   defaultValue="1" name="cantidad"/>
                                        </div>
                                    </form>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </div>
    );
}