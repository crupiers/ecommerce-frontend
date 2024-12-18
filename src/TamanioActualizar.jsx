import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient"
import { useParams } from "react-router-dom";

function TamanioActualizar() {

    const { id } = useParams();

    const [Tamanio, setTamanio] = useState({
    });

    const {nombre, descripcion} = Tamanio;

    useEffect(() => {
            getData();
        },[]);
    
        const getData = async () => {
            const tamanioObtenido = await AXIOS_CLIENT.get(`tamanios/${id}`);
            setTamanio({
                nombre: tamanioObtenido.data.nombre,
                descripcion: tamanioObtenido.data.descripcion
            })
        }

    const onInputChange = (e) => {
        if (e?.target?.name === undefined || e?.target?.value === undefined) return;
        setTamanio({...Tamanio, [e.target.name]: e.target.value});
    };

    /**
     * Función constante para consultar al backend por un tamaño duplicado.
     *
     * @returns {Promise<boolean>} `true` si el tamaño ya existe, `false` en caso contrario.
     */

    const checkDuplicate = async () => {
        try {
            // Realizar una petición GET al backend para verificar si la tamaño ya existe.
            const response = await AXIOS_CLIENT.get(
                `/tamanios/existe/${nombre}`
            );
            return response.data != ""; //si la data no tiene nada, el tamaño no está registrado
        } catch (error) {
            throw new Error("ERROR AL BUSCAR TAMAÑO DUPLICADO");
        }
    };

    /** Handler para gestionar la subida del formulario/confirmación de agregar. */
    const onSubmit = async (e) => {
        // Prevenir que se procese el `submit` por defecto del formulario para evitar recargar la página.
        e.preventDefault();

        try {
            /**
             // Validar si existe un tamaño duplicado.
             const isDuplicate = await checkDuplicate();
             if (isDuplicate) {
             alert("EL TAMAÑO YA EXISTE");
             return;
             }
             */
            // Utilizar Axios para realizar una petición POST a la URL declarada, enviando la información del tamaño.
            await AXIOS_CLIENT.put(`tamanios/actualizar/${id}`, Tamanio);
            alert("TAMAÑO ACTUALIZADO CON ÉXITO")
        } catch (error) {
            alert("ERROR AL ACTUALIZAR TAMAÑO", error);
        }
    };

    return (
        <div className="container">
            <div className={"text-center mt-3"} style={{}}>
                <h1>ACTUALIZAR TAMAÑO</h1>
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

export default TamanioActualizar;