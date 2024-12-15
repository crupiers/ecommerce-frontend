import React, { useState } from "react";
import { AXIOS_CLIENT } from "./lib/axiosClient";

function StockFormulario() {
    const [MovimientoStock, setMovimientoStock] = useState({
        productoId: 0,
        motivo: "",
        cantidad: "",
        tipoMovimiento: ""
    });

    const { productoId, motivo, cantidad, tipoMovimiento } = MovimientoStock;

    const onInputChange = (e) => {
        if (e?.target?.name === undefined || e?.target?.value === undefined) return;
        setMovimientoStock({ ...MovimientoStock, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(MovimientoStock);
        console.log(productoId);

        try {
            await AXIOS_CLIENT.post(`/movimientoStock/${productoId}` , MovimientoStock);
            alert("STOCK MODIFICADO CON ÉXITO");
        } catch (error) {
            console.error("Error al modificar el stock:" );
            alert(`ERROR AL MODIFICAR STOCK `);
        }
    };

    return (
        <div className="container">
            <div className="container text-center">
                <h3>FORMULARIO STOCK</h3>
            </div>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="mb-3">
                    <label htmlFor="productoId" className="form-label">PRODUCTO</label>
                    <input
                        type="number"
                        className="form-control"
                        id="productoId"
                        name="productoId"
                        required={true}
                        value={productoId}
                        onChange={(e) => onInputChange(e)}
                    />
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

                <button type="submit" className="btn btn-primary">MODIFICAR</button>
            </form>
        </div>
    );
}

export default StockFormulario;