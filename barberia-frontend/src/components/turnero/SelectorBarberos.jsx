import React from 'react';

function SelectorBarberos({ barberos, onSelectBarbero }) {
  if (!barberos.length) return <p>Cargando barberos...</p>;

  return (
    <div className="turnero-step-panel">
      <h2 className="turnero-step-title">Paso 2: Elige un barbero</h2>
      <div className="turnero-option-list">
        {barberos.map(b => (
          <button 
            key={b.IdBarbero} 
            type="button" 
            className="turnero-option-btn"
            onClick={() => onSelectBarbero(b)}
          >
            <strong>{b.Nombre}</strong>
            <span>{b.Especialidad}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
export default SelectorBarberos;