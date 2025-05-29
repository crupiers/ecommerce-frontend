import React from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient.js";
import {useEffect, useState} from "react";
import {useDropzone} from "react-dropzone"

export function ProductoRegistrar() {

    useEffect(() => {
        getColores();
        getCategorias();
        getMarcas();
        getTamanios();
    }, []);

    const [colores, setColores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tamanios, setTamanios] = useState([]);
    const [imagen, setImagen] = useState(null);

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

    const [Producto, setProducto] = useState({
        nombre: "",
        descripcion: "",
        precio: 0,
        stock: 0,
        umbral: 0,
        colorId: 0,
        categoriaId: 0,
        marcaId: 0,
        tamanioId: 0,
        codigoBarra: 0
    });

    const {nombre, descripcion, precio, stock, umbral, colorId, categoriaId, marcaId, tamanioId, codigoBarra} = Producto;

    const onInputChange = (e) => {
        setProducto({...Producto, [e.target.name]: e.target.value});
    }

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            const base64Image = reader.result;
            setImagen(base64Image);
        };
        reader.readAsDataURL(file);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!imagen) {
            alert("Por favor, sube una imagen del producto.");
            return;
        }
        try {
            const producto = await AXIOS_CLIENT.post("/admin/productos", Producto);
            await AXIOS_CLIENT.post("/admin/imagenes", {
                idProducto: Number(producto.data.id),
                imagenBase64: imagen
            });
            alert("PRODUCTO REGISTRADO CON ÉXITO");
            window.location.reload();
        } catch (error) {
            alert(`ERROR AL REGISTRAR PRODUCTO: \n${error.response.data.message}`);
        }
    };

    const {getRootProps, getInputProps} = useDropzone({onDrop, accept: "image/*"});

    return (
        <div className="container">
            <div className={"text-center mt-3"} style={{}}>
                <h1>REGISTRAR PRODUCTO</h1>
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
                <label className={"form-label"}>IMAGEN</label>
                <div className="mb-3" {...getRootProps()}
                     style={{border: "2px dashed #cccccc", padding: "20px", textAlign: "center"}}>
                    <input {...getInputProps()} />
                    {imagen ? <img src={imagen} alt="Imagen del producto" style={{height: '18rem', width: '18rem', padding: '15px'}}/> :
                        <span style={{color: "gray"}}>Arrastra una imagen aquí, o haz clic para seleccionar una</span>}
                </div>
                <button type="submit" className="btn btn-primary mb-5">REGISTRAR</button>
            </form>
        </div>
    )
}