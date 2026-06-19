// src/turnos.service.js
import axios from 'axios';
const API_URL = 'http://localhost:3000/api';

async function getHorariosDisponibles(fecha, idBarbero, idServicio) {
  const params = { fecha, idBarbero, idServicio };
  const response = await axios.get(`${API_URL}/turnos/disponibles`, { params });
  return response.data;
}

async function crearTurno(datosTurno) {
  const response = await axios.post(`${API_URL}/turnos`, datosTurno);
  return response.data;
}

export const turnosService = {
  getHorariosDisponibles,
  crearTurno,
};