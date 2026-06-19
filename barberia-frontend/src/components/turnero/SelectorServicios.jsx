import React from 'react';

function SelectorServicios({ servicios, onSelectServicio }) {
  if (!servicios.length) return <p>Cargando servicios...</p>;

  return (
    <div>
      <h2>Paso 1: Elige un servicio</h2>
      <div className="list-group">
        {servicios.map(s => (
          <button 
            key={s.IdServicio} 
            type="button" 
            className="list-group-item list-group-item-action"
            onClick={() => onSelectServicio(s)}
          >
            <strong>{s.Nombre}</strong> - ${s.Precio} ({s.DuracionMinutos} min)
          </button>
        ))}
      </div>
    </div>
  );
}
export default SelectorServicios;