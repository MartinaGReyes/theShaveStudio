import React from 'react';

function SelectorBarberos({ barberos, onSelectBarbero }) {
  if (!barberos.length) return <p>Cargando barberos...</p>;

  return (
    <div>
      <h2>Paso 2: Elige un barbero</h2>
      <div className="list-group">
        {barberos.map(b => (
          <button 
            key={b.IdBarbero} 
            type="button" 
            className="list-group-item list-group-item-action"
            onClick={() => onSelectBarbero(b)}
          >
            <strong>{b.Nombre}</strong> - {b.Especialidad}
          </button>
        ))}
      </div>
    </div>
  );
}
export default SelectorBarberos;