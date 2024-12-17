import {useEffect, useState} from "react";
import {AXIOS_CLIENT} from "./lib/axiosClient";

function MovimientoStockRegistrar() {
    const [MovimientoStock, setMovimientoStock] = useState({
        productoId: 0,
        motivo: "",
        cantidad: "",
        tipoMovimiento: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [productos, setProductos] = useState([]);
    const {productoId, motivo, cantidad, tipoMovimiento} = MovimientoStock;

    const onInputChange = (e) => {
        if (e?.target?.name === undefined || e?.target?.value === undefined) return;
        setMovimientoStock({...MovimientoStock, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = async () => {
        try {
            const value = await AXIOS_CLIENT.get("/productos");
            setProductos(value.data);
        } catch (error) {
            alert(`ERROR AL OBTENER PRODUCTOS: \n${error.response.data.message}`)
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await AXIOS_CLIENT.post(`/admin/movimientoStock/${productoId}`, MovimientoStock);
            alert("STOCK MODIFICADO CON ÉXITO");
        } catch (error) {
            alert(`ERROR MODIFICAR STOCK: \n${error.response.data.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            <div className="container text-center mt-3">
                <h1>FORMULARIO STOCK</h1>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="productoId" className="form-label">PRODUCTO</label>
                    <select
                        className="form-control"
                        id="productoId"
                        name="productoId"
                        required={true}
                        value={productoId}
                        onChange={(e) => onInputChange(e)}
                    >
                        <option value="">SELECCIONAR PRODUCTO</option>
                        {productos.map((producto) => (
                            <option key={producto.id} value={producto.id}>
                                {producto.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="tipoMovimiento" className="form-label">Tipo Movimiento</label>
                    <div>
                        <input
                            type="radio"
                            name="tipoMovimiento"
                            value="ENTRADA"
                            id="entrada"
                            onChange={(e) => onInputChange(e)}
                        />
                        <label htmlFor="entrada">Entrada</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="tipoMovimiento"
                            value="SALIDA"
                            id="salida"
                            onChange={(e) => onInputChange(e)}
                        />
                        <label htmlFor="salida">Salida</label>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="cantidad" className="form-label">CANTIDAD AJUSTADA</label>
                    <input
                        type="number"
                        className="form-control"
                        id="cantidad"
                        name="cantidad"
                        required={true}
                        value={cantidad}
                        min="1"
                        defaultValue="1"
                        onChange={(e) => onInputChange(e)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="motivo" className="form-label">RAZÓN AJUSTE</label>
                    <input
                        type="text"
                        className="form-control"
                        id="motivo"
                        name="motivo"
                        required={true}
                        value={motivo}
                        onChange={(e) => onInputChange(e)}
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "MODIFICAR"}
                </button>
            </form>
        </div>
    );
}

export default MovimientoStockRegistrar;