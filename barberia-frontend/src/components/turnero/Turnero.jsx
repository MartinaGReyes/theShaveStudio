// src/components/turnero/Turnero.jsx

import React, { useState, useEffect } from 'react';

// Importamos los componentes de cada paso
import SelectorServicios from './SelectorServicios';
import SelectorBarberos from './SelectorBarberos';
import CalendarioDisponibilidad from './CalendarioDisponibilidad';
import FormularioConfirmacion from './FormularioConfirmacion';

// Importamos los servicios
import { serviciosService } from '../../services/servicios.service.js';
import { barberosService } from '../../services/barberos.service.js';
import { turnosService } from '../../services/turnos.service.js';

function Turnero() {
  // Estados para los datos de la API
  const [servicios, setServicios] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState('');

  // Estados para la selección del usuario
  const [paso, setPaso] = useState(1); // 1: Servicio, 2: Barbero, 3: Fecha/Hora, 4: Datos, 5: Confirmación
  const [seleccion, setSeleccion] = useState({
    servicio: null,
    barbero: null,
    fecha: '',
    hora: '',
    cliente: { Nombre: '', Apellido: '', Telefono: '', Email: '' },
    turnoConfirmado: null
  });

  // Efecto para cargar servicios y barberos al inicio
  useEffect(() => {
    async function cargarDatosIniciales() {
      try {
        const [serviciosData, barberosData] = await Promise.all([
          serviciosService.getServicios(),
          barberosService.getBarberos()
        ]);
        setServicios(serviciosData);
        setBarberos(barberosData);
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
        alert("No se pudieron cargar los servicios o barberos. Intente más tarde.");
      }
    }
    cargarDatosIniciales();
  }, []);
  
  // Efecto para buscar horarios cuando se selecciona fecha, barbero y servicio
  useEffect(() => {
    if (seleccion.fecha && seleccion.barbero && seleccion.servicio) {
      async function buscarHorarios() {
        setCargandoHorarios(true);
        try {
          const horarios = await turnosService.getHorariosDisponibles(
            seleccion.fecha,
            seleccion.barbero.IdBarbero,
            seleccion.servicio.IdServicio
          );
          setHorariosDisponibles(horarios);
        } catch (error) {
          console.error("Error al buscar horarios:", error);
          alert("No se pudieron cargar los horarios para la fecha seleccionada.");
          setHorariosDisponibles([]);
        } finally {
          setCargandoHorarios(false);
        }
      }
      buscarHorarios();
    }
  }, [seleccion.fecha, seleccion.barbero, seleccion.servicio]);

  // --- Funciones para manejar la selección en cada paso ---
  const handleSelectServicio = (servicio) => {
    setSeleccion({ ...seleccion, servicio });
    setPaso(2);
  };

  const handleSelectBarbero = (barbero) => {
    setSeleccion({ ...seleccion, barbero });
    setPaso(3);
  };

  const handleSelectFechaHora = (fecha, hora) => {
    setSeleccion({ ...seleccion, fecha, hora });
    setPaso(4);
  };

  const handleSubmitDatosCliente = (datosCliente) => {
    setErrorMensaje('');
    // Actualizamos el estado primero
    const nuevaSeleccion = { ...seleccion, cliente: datosCliente };
    setSeleccion(nuevaSeleccion);
    
    // Y LUEGO llamamos a la función que crea el turno, pasándole la selección actualizada
    crearTurnoFinal(nuevaSeleccion); 
  };
  
  const crearTurnoFinal = async (seleccionActual) => {
    // Usamos la selección actualizada que recibimos como parámetro
    const { servicio, barbero, fecha, hora, cliente } = seleccionActual;
    
    if (!servicio || !barbero || !fecha || !hora || !cliente) {
        const mensaje = "Faltan datos en la selección. Por favor, reinicie el proceso.";
        setErrorMensaje(mensaje);
        return;
    }

    // Combinar fecha y hora en un formato ISO 8601 que el backend entienda
    // El backend espera UTC, así que componemos el string y lo convertimos
    const fechaHoraISO = new Date(`${fecha}T${hora}:00`).toISOString();

    const datosTurno = {
        FechaHora: fechaHoraISO,
        IdBarbero: barbero.IdBarbero,
        IdServicio: servicio.IdServicio,
        Nombre: cliente.Nombre,
        Apellido: cliente.Apellido,
        Telefono: cliente.Telefono,
        Email: cliente.Email || null
    };
    
    try {
        const turnoCreado = await turnosService.crearTurno(datosTurno);
        // Actualizamos el estado con el turno confirmado para mostrarlo en el paso 5
        setSeleccion(prev => ({ ...prev, turnoConfirmado: turnoCreado }));
        setPaso(5); // Ir al paso de confirmación
    } catch (error) {
        console.error("Error al crear el turno:", error);
        const mensaje = error.response?.data?.message || error.message || 'Error al confirmar el turno. Intente nuevamente.';
        setErrorMensaje(mensaje);
    }
  };

  const handleReset = () => {
    setPaso(1);
    setErrorMensaje('');
    setSeleccion({
      servicio: null,
      barbero: null,
      fecha: '',
      hora: '',
      cliente: { Nombre: '', Apellido: '', Telefono: '', Email: '' },
      turnoConfirmado: null
    });
    setHorariosDisponibles([]);
  };

  const pasos = [1, 2, 3, 4, 5];

  // --- Renderizado condicional de componentes ---
  return (
    <div className="turnero-shell">
      <div className="turnero-card">
        <div className="turnero-header">
          <h1 className="turnero-title">Solicitar un Turno</h1>
          <p className="turnero-subtitle">Elegí tu servicio, tu profesional y tu horario ideal en pocos pasos.</p>
        </div>

        <div className="turnero-timeline" aria-label="Progreso del turno">
          {pasos.map((numeroPaso) => {
            const completado = numeroPaso < paso;
            const activo = numeroPaso === paso;
            return (
              <div key={numeroPaso} className="turnero-timeline-step">
                <div className={`turnero-timeline-circle ${completado ? 'completed' : ''} ${activo ? 'active' : ''}`}>
                  {numeroPaso}
                </div>
              </div>
            );
          })}
        </div>

        {errorMensaje && <div className="alert turnero-alert turnero-alert-danger">{errorMensaje}</div>}
        
        {paso === 1 && <SelectorServicios servicios={servicios} onSelectServicio={handleSelectServicio} />}
        
        {paso === 2 && <SelectorBarberos barberos={barberos} onSelectBarbero={handleSelectBarbero} />}
        
        {paso === 3 && (
          <CalendarioDisponibilidad 
            onSelectFechaHora={handleSelectFechaHora} 
            horariosDisponibles={horariosDisponibles}
            cargando={cargandoHorarios}
            onFechaChange={(fecha) => setSeleccion(prev => ({ ...prev, fecha, hora: '' }))}
          />
        )}
        
        {paso === 4 && <FormularioConfirmacion onSubmit={handleSubmitDatosCliente} />}

        {paso === 5 && (
          <div className="turnero-success-card">
            <h2>¡Turno Confirmado!</h2>
            <p>Gracias, {seleccion.cliente.Nombre}. Tu turno ha sido agendado con éxito.</p>
            <p><strong>Servicio:</strong> {seleccion.servicio.Nombre}</p>
            <p><strong>Barbero:</strong> {seleccion.barbero.Nombre}</p>
            <p><strong>Fecha y Hora:</strong> {new Date(seleccion.turnoConfirmado.FechaHora).toLocaleString('es-AR')}</p>
            <button className="hero-cta-btn mt-3" onClick={handleReset}>Solicitar Otro Turno</button>
          </div>
        )}

        {paso > 1 && paso < 5 && (
          <button className="turnero-secondary-btn mt-3" onClick={() => setPaso(paso - 1)}>
            Volver
          </button>
        )}
      </div>
    </div>
  );
}

export default Turnero;