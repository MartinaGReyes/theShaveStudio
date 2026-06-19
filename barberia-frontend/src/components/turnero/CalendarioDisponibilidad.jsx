import React, { useState } from 'react';

function CalendarioDisponibilidad({ onSelectFechaHora, horariosDisponibles, cargando, onFechaChange }) {
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');

  const handleFechaChange = (e) => {
    const nuevaFecha = e.target.value;
    setFechaSeleccionada(nuevaFecha);
    onFechaChange(nuevaFecha); // Informar al padre sobre el cambio de fecha
  };
  
  return (
    <div>
      <h2>Paso 3: Elige fecha y hora</h2>
      <div className="mb-3">
        <label htmlFor="fecha" className="form-label">Selecciona una fecha:</label>
        <input 
          type="date" 
          id="fecha"
          className="form-control"
          value={fechaSeleccionada}
          onChange={handleFechaChange}
          // Para que no se puedan elegir fechas pasadas
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      {cargando && <p>Buscando horarios disponibles...</p>}
      
      {!cargando && fechaSeleccionada && (
        <div>
          <h4>Horarios disponibles para el {new Date(fechaSeleccionada + 'T00:00:00').toLocaleDateString('es-AR')}:</h4>
          {horariosDisponibles.length > 0 ? (
            <div className="d-flex flex-wrap gap-2">
              {horariosDisponibles.map(hora => (
                <button 
                  key={hora} 
                  className="btn btn-outline-primary"
                  onClick={() => onSelectFechaHora(fechaSeleccionada, hora)}
                >
                  {hora}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-danger">No hay horarios disponibles para este día. Por favor, elige otra fecha.</p>
          )}
        </div>
      )}
    </div>
  );
}
export default CalendarioDisponibilidad;