import React, { useState } from 'react';

function FormularioConfirmacion({ onSubmit }) {
  const [datos, setDatos] = useState({
    Nombre: '',
    Apellido: '',
    Telefono: '',
    Email: ''
  });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!datos.Nombre || !datos.Apellido || !datos.Telefono) {
        alert("Por favor, completa Nombre, Apellido y Teléfono.");
        return;
    }
    onSubmit(datos);
  };

  return (
    <div>
      <h2>Paso 4: Completa tus datos</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Nombre" className="form-label">Nombre</label>
          <input type="text" className="form-control" name="Nombre" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="Apellido" className="form-label">Apellido</label>
          <input type="text" className="form-control" name="Apellido" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="Telefono" className="form-label">Teléfono</label>
          <input type="tel" className="form-control" name="Telefono" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">Email (Opcional)</label>
          <input type="email" className="form-control" name="Email" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Confirmar Turno</button>
      </form>
    </div>
  );
}
export default FormularioConfirmacion;