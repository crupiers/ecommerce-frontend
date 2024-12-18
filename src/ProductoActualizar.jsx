import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone"
import { useNavigate, useParams } from "react-router-dom";

export function ProductoActualizar() {
    let navegacion = useNavigate();
    const { id } = useParams();

    const [colores, setColores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tamanios, setTamanios] = useState([]);
    const [Producto, setProducto] = useState({});

    const {nombre, descripcion, precio, stock, umbral, colorId, categoriaId, marcaId, tamanioId, codigoBarra} = Producto;

    useEffect(() => {
        getColores();
        getCategorias();
        getMarcas();
        getTamanios();
    }, []);

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
            alert(`ERROR AL OBTENER CATEGORIAS: \n${error.response.data.message}`);
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

async function getIdPorNombre(array, nombre) {
    const item = array.find(obj => obj.nombre === nombre);
    return item ? item.id : null;    
}

    useEffect(() => {

        const getData = async () => {
            const productoObtenido = await AXIOS_CLIENT.get(`/productos/${id}`);
            const idColor = await getIdPorNombre(colores,productoObtenido.data.nombreColor);
            const idCategoria = await getIdPorNombre(categorias,productoObtenido.data.nombreCategoria);
            const idMarca = await getIdPorNombre(marcas,productoObtenido.data.nombreMarca);
            const idTamanio = await getIdPorNombre(tamanios,productoObtenido.data.nombreTamanio);
            setProducto({
                nombre: productoObtenido.data.nombre,
                descripcion: productoObtenido.data.descripcion,
                precio: productoObtenido.data.precio,
                stock: productoObtenido.data.stock,
                umbral: productoObtenido.data.umbral,
                colorId: idColor,
                categoriaId: idCategoria,
                marcaId: idMarca,
                tamanioId: idTamanio,
                codigoBarra: productoObtenido.data.codigoBarra
            });
        }

        getData();

    }, [colores],[categorias], [marcas], [tamanios]); 

    const onInputChange = (e) => {
        setProducto({...Producto, [e.target.name]: e.target.value});
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await AXIOS_CLIENT.put(`/productos/actualizar/${id}`, Producto);
            alert("PRODUCTO ACTUALIZADO CON ÉXITO");
            navegacion("/productos/listar");
        } catch (error) {
            alert(`ERROR AL ACTUALIZAR PRODUCTO: \n${error.response.data.message}`);
        }
    };


    return (
        <div className="container">
            <div className={"text-center mt-3"} style={{}}>
                <h1>ACTUALIZAR PRODUCTO</h1>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">NOMBRE</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        required={true}
                        value={nombre}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">DESCRIPCIÓN</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        required={true}
                        value={descripcion}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">PRECIO</label>
                    <input
                        type="number"
                        className="form-control"
                        id="precio"
                        name="precio"
                        required={true}
                        value={precio}
                        min={1}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">STOCK</label>
                    <input
                        type="number"
                        className="form-control"
                        id="stock"
                        name="stock"
                        required={true}
                        value={stock}
                        min={1}
                        onChange={(e) => onInputChange(e)}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="umbral" className="form-label">UMBRAL</label>
                    <input
                        type="number"
                        className="form-control"
                        id="umbral"
                        name="umbral"
                        required={true}
                        value={umbral}
                        onChange={(e) => onInputChange(e)}
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="colorId" className="form-label">COLOR</label>
                    <select
                        className="form-select"
                        id="colorId"
                        name="colorId"
                        required={true}
                        value={colorId}
                        onChange={(e) => onInputChange(e)}
                    >
                        <option value={0}>SELECCIONAR COLOR</option>
                        {colores.map((color, indice) => (
                            <option key={indice} value={color.id}>{color.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="categoriaId" className="form-label">CATEGORIA</label>
                    <select
                        className="form-select"
                        id="categoriaId"
                        name="categoriaId"
                        required={true}
                        value={categoriaId}
                        onChange={(e) => onInputChange(e)}
                    >
                        <option value={0}>SELECCIONAR CATEGORIA</option>
                        {categorias.map((categoria, indice) => (
                            <option key={indice} value={categoria.id}>{categoria.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="marcaId" className="form-label">MARCA</label>
                    <select
                        className="form-select"
                        id="marcaId"
                        name="marcaId"
                        required={true}
                        value={marcaId}
                        onChange={(e) => onInputChange(e)}
                    >
                        <option value={0}>SELECCIONAR MARCA</option>
                        {marcas.map((marca, indice) => (
                            <option key={indice} value={marca.id}>{marca.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="tamanioId" className="form-label">TAMAÑO</label>
                    <select
                        className="form-select"
                        id="tamanioId"
                        name="tamanioId"
                        required={true}
                        value={tamanioId}
                        onChange={(e) => onInputChange(e)}
                    >
                        <option value={0}>SELECCIONAR TAMAÑO</option>
                        {tamanios.map((tamanio, indice) => (
                            <option key={indice} value={tamanio.id}>{tamanio.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="codigoBarra" className="form-label">CODIGO DE BARRA</label>
                    <input
                        type="number"
                        className="form-control"
                        id="codigoBarra"
                        name="codigoBarra"
                        required={true}
                        value={codigoBarra}
                        onChange={(e) => onInputChange(e)}
                    ></input>
                </div>
                <button type="submit" className="btn btn-primary mb-5">ACTUALIZAR</button>
            </form>
        </div>
    )
}