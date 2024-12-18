import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"
import { useNavigate, useParams } from "react-router-dom";

function MarcaActualizar() {
    let navegacion = useNavigate();
const { id } = useParams();

    const [marca, setMarca] = useState({
    });

    const {nombre, descripcion} = marca;

    useEffect(() => {
            getData();
        },[]);
    
        const getData = async () => {
            const marcaObtenida = await AXIOS_CLIENT.get(`marcas/${id}`);
            setMarca({
                nombre: marcaObtenida.data.nombre,
                descripcion: marcaObtenida.data.descripcion
            })
        }

    const onInputChange = (e) => {
        if (e?.target?.name === undefined || e?.target?.value === undefined) return;
        setMarca({...marca, [e.target.name]: e.target.value});
    };

    /**
     * Función constante para consultar al backend por una marca duplicada.
     *
     * @returns {Promise<boolean>} `true` si la marca ya existe, `false` en caso contrario.
     */

    const checkDuplicate = async () => {
        try {
            // Realizar una petición GET al backend para verificar si la marca ya existe.
            const response = await AXIOS_CLIENT.get(`/marcas/existe/${nombre}`)
            return !!response.data
        } catch (error) {
            // Tirar un error. En el ejemplo, el try/catch del `onSubmit` manejará el error si ocurriría.
            throw new Error("ERROR AL BUSCAR MARCA DUPLICADA");
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            /**
             const isDuplicate = await checkDuplicate();
             if (isDuplicate) {
             alert("LA MARCA YA EXISTE");
             return;
             }
             */

            // Utilizar Axios para realizar una petición POST a la URL declarada, enviando la información del tamaño.
            await AXIOS_CLIENT.put(`marcas/actualizar/${id}`, marca);
            alert("MARCA ACTUALIZADA CON ÉXITO");
            navegacion("/marcas/listar");
        } catch (error) {
            alert("ERROR AL ACTUALIZAR MARCA", error);
        }
    };
    return (
        <div className="container">
            <div className={"text-center mt-3"} style={{}}>
                <h1>ACTUALIZAR MARCA</h1>
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
                        value={descripcion}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">ACTUALIZAR</button>
            </form>
        </div>
    );
}

export default MarcaActualizar;