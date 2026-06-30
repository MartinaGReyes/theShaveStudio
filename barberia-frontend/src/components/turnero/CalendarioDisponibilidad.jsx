import React, { useState } from 'react';

function CalendarioDisponibilidad({ onSelectFechaHora, horariosDisponibles, cargando, onFechaChange }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');

  const handleFechaChange = (e) => {
    const nuevaFecha = e.target.value;
    setFechaSeleccionada(nuevaFecha);
    onFechaChange(nuevaFecha); // Informar al padre sobre el cambio de fecha
  };
  
  return (
    <div className="turnero-step-panel">
      <h2 className="turnero-step-title">Paso 3: Elige fecha y hora</h2>
      <div className="turnero-calendar-box mb-4">
        <label htmlFor="fecha" className="turnero-form-label">Selecciona una fecha:</label>
        <input 
          type="date" 
          id="fecha"
          className="form-control turnero-form-control turnero-date-input"
          value={fechaSeleccionada}
          onChange={handleFechaChange}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      {cargando && <p className="turnero-helper-text">Buscando horarios disponibles...</p>}
      
      {!cargando && fechaSeleccionada && (
        <div>
          <h4 className="turnero-horarios-title">Horarios disponibles para el {new Date(fechaSeleccionada + 'T00:00:00').toLocaleDateString('es-AR')}:</h4>
          {horariosDisponibles.length > 0 ? (
            <div className="turnero-time-list">
              {horariosDisponibles.map(hora => (
                <button 
                  key={hora} 
                  className="turnero-time-btn"
                  onClick={() => onSelectFechaHora(fechaSeleccionada, hora)}
                >
                  {hora}
                </button>
              ))}
            </div>
          ) : (
            <p className="turnero-helper-text turnero-helper-error">No hay horarios disponibles para este día. Por favor, elige otra fecha.</p>
          )}
        </div>
      )}
    </div>
  );
}
export default CalendarioDisponibilidad;