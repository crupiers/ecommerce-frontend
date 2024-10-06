

function RegistrarColor() {
  
  
  return (
    <div className="container">
      <div className="container text-center" style={{ margin: "30px" }}>
        <h3>Formulario Agregar Color 3</h3>
      </div>

      <form >
        <div className="mb-3">
          <label htmlFor="denominación" className="form-label">
            Denominación
          </label>
          
        </div>
        <div className="mb-3">
          <label htmlFor="observación" className="form-label">
            Obsevacion
          </label>
          <input
            type="text"
            className="form-control"
            id="observacion"
            name="observacion"
            value={observacion}
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-warning btn-sm me-3">
            Agregar
          </button>
          <a href="/" className="btn btn-danger btn-sm">
            Regresar
          </a>
        </div>
      </form>
    </div>
  );
}

export default RegistrarColor;
