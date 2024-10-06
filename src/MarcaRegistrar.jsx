import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MarcaRegistrar() {


  return (
    <div>
    <h1>REGISTRAR NUEVA MARCA</h1>
    <form>
      <div className="mb-3">
        <label htmlFor="input1" className="form-label">NOMBRE</label>
        <input type="text" className="form-control" id="input1" />
        <label htmlFor="input1" className="form-label">DESCRIPCION</label>
        <input type="text" className="form-control" id="input1" />
      </div>
      <button type="submit" className="btn btn-primary">REGISTRAR</button>
    </form>
  </div>
  );
}

export default MarcaRegistrar;
