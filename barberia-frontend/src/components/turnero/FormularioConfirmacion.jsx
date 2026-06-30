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
    <div className="turnero-step-panel">
      <h2 className="turnero-step-title">Paso 4: Completa tus datos</h2>
      <form onSubmit={handleSubmit} className="turnero-form">
        <div className="mb-3">
          <label htmlFor="Nombre" className="turnero-form-label">Nombre</label>
          <input type="text" className="form-control turnero-form-control" name="Nombre" placeholder="Ej: Martina" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="Apellido" className="turnero-form-label">Apellido</label>
          <input type="text" className="form-control turnero-form-control" name="Apellido" placeholder="Ej: López" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="Telefono" className="turnero-form-label">Teléfono</label>
          <input type="tel" className="form-control turnero-form-control" name="Telefono" placeholder="Ej: 3512345678" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="turnero-form-label">Email (Opcional)</label>
          <input type="email" className="form-control turnero-form-control" name="Email" placeholder="Ej: martina@email.com" onChange={handleChange} />
        </div>
        <button type="submit" className="hero-cta-btn">Confirmar Turno</button>
      </form>
    </div>
  );
}
export default FormularioConfirmacion;