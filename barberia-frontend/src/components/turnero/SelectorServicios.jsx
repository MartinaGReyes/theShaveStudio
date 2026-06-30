import React from 'react';

function SelectorServicios({ servicios, onSelectServicio }) {
  if (!servicios.length) return <p>Cargando servicios...</p>;

  return (
    <div className="turnero-step-panel">
      <h2 className="turnero-step-title">Paso 1: Elige un servicio</h2>
      <div className="turnero-option-list">
        {servicios.map(s => (
          <button 
            key={s.IdServicio} 
            type="button" 
            className="turnero-option-btn"
            onClick={() => onSelectServicio(s)}
          >
            <strong>{s.Nombre}</strong>
            <span>${s.Precio} • {s.DuracionMinutos} min</span>
          </button>
        ))}
      </div>
    </div>
  );
}
export default SelectorServicios;