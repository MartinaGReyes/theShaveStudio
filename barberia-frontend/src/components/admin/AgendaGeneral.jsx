// src/components/admin/AgendaGeneral.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AgendaGeneral() {
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgenda = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/turnos');
                setTurnos(response.data);
            } catch (error) {
                console.error('Error al cargar la agenda:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAgenda();
    }, []);

    const formatFecha = (fechaISO) => {
        if (!fechaISO) return 'N/A';
        const fecha = new Date(fechaISO);
        return fecha.toLocaleDateString('es-AR', { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    const formatHora = (fechaISO) => {
        if (!fechaISO) return 'N/A';
        const fecha = new Date(fechaISO);
        return fecha.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    };

    if (loading) {
        return <div className="alert alert-info">Cargando agenda...</div>;
    }

    return (
        <div>
            <h3>Agenda General</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Barbero</th>
                        <th>Cliente</th>
                        <th>Servicio</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {turnos.length > 0 ? (
                        turnos.map(turno => (
                            <tr key={turno.IdTurno}>
                                <td>{formatFecha(turno.FechaHora)}</td>
                                <td>{formatHora(turno.FechaHora)}</td>
                                <td>{turno.barbero?.Nombre || 'N/A'}</td>
                                <td>{turno.cliente?.Nombre ? `${turno.cliente.Nombre} ${turno.cliente.Apellido}` : 'N/A'}</td>
                                <td>{turno.servicio?.Nombre || 'N/A'}</td>
                                <td>{turno.Estado}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No hay turnos registrados</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AgendaGeneral;
