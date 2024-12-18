import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"
import { useParams } from "react-router-dom";

function CategoriaActualizar() {
    const { id } = useParams();

    const [Categoria, setCategoria] = useState({});

    const {nombre, descripcion} = Categoria;

    useEffect(() => {
        getData();
    },[]);

    const getData = async () => {
        const categoriaObtenida = await AXIOS_CLIENT.get(`categorias/${id}`);
        setCategoria({
            nombre: categoriaObtenida.data.nombre,
            descripcion: categoriaObtenida.data.descripcion
        })
    }

    const onInputChange = (e) => {
        if (e?.target?.name === undefined || e?.target?.value === undefined) return;
        setCategoria({...Categoria, [e.target.name]: e.target.value});
    };

    /**
     * Función constante para consultar al backend por una Categoria duplicada.
     *
     * @returns {Promise<boolean>} `true` si la Categoria ya existe, `false` en caso contrario.
     */

    const checkDuplicate = async () => {
        try {
            // Realizar una petición GET al backend para verificar si la Categoria ya existe.
            const response = await AXIOS_CLIENT.get(
                `/categorias/existe/${nombre}`
            );
            return response.data != "";
        } catch (error) {
            throw new Error("ERROR AL BUSCAR CATEGORÍA DUPLICADA");
        }
    };

    /** Handler para gestionar la subida del formulario/confirmación de agregar. */
    const onSubmit = async (e) => {
        // Prevenir que se procese el `submit` por defecto del formulario para evitar recargar la página.
        e.preventDefault();

        try {
            /**
             // Validar si existe una Categoria duplicada.
             const isDuplicate = await checkDuplicate();
             //console.log("ESTÁ DUPLICADO: "+isDuplicate)
             if (isDuplicate) {
             alert("LA CATEGORIA YA EXISTE");
             return;
             }
             */


            // Utilizar Axios para realizar una petición POST a la URL declarada, enviando la información de la Categoria.
            await AXIOS_CLIENT.put(`/categorias/actualizar/${id}`, Categoria);
            alert("CATEGORIA ACTUALIZADA CON ÉXITO")
        } catch (error) {
            alert("ERROR AL ACTUALIZAR CATEGORÍA", error);
        }
    };

    return (
        <div className="container">
            <div className={"text-center mt-3"} style={{}}>
                <h1>ACTUALIZAR CATEGORÍA</h1>
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
                <button type="submit" className="btn btn-primary">ACTUALIZAR</button>
            </form>
        </div>
    );
}

export default CategoriaActualizar;