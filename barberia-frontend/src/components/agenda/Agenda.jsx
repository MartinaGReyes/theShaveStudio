// src/components/agenda/Agenda.jsx
import React, { useState, useEffect } from 'react';
import { authService } from '../../services/auth.service';
import axios from 'axios';

function Agenda() {
    const [turnos, setTurnos] = useState([]);
    const [fecha, setFecha] = useState('');

    useEffect(() => {
        const fetchAgenda = async () => {
            try {
                const token = authService.getToken();
                const response = await axios.get(`http://localhost:3000/api/agenda`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: fecha ? { fecha } : {}
                });
                setTurnos(response.data);
            } catch (error) {
                alert('No se pudo cargar la agenda. Es posible que tu sesión haya expirado.');
            }
        };

        fetchAgenda();
    }, [fecha]);

    const formatFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString('es-AR', { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    const formatHora = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    }

    return (
        <div>
            <h2>Mi Agenda</h2>
            <div className="mb-3">
                <label>Fecha (opcional)</label>
                <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                <small className="form-text text-muted">Deja vacío para ver todos los turnos.</small>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Servicio</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {turnos.map(turno => (
                        <tr key={turno.IdTurno}>
                            <td>{formatFecha(turno.FechaHora)}</td>
                            <td>{formatHora(turno.FechaHora)}</td>
                            <td>{turno.cliente.Nombre} {turno.cliente.Apellido}</td>
                            <td>{turno.servicio.Nombre}</td>
                            <td>{turno.Estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Agenda;