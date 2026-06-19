// src/services/admin.service.js

import axios from 'axios';
import { authService } from './auth.service';

const API_URL = 'http://localhost:3000/api/admin';

// Función helper para obtener los headers con el token
const getAuthHeaders = () => {
    const token = authService.getToken();
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

// --- Barberos ---
const getBarberos = () => axios.get(`${API_URL}/barberos`, getAuthHeaders());
const createBarbero = (data) => axios.post(`${API_URL}/barberos`, data, getAuthHeaders());
const updateBarbero = (id, data) => axios.put(`${API_URL}/barberos/${id}`, data, getAuthHeaders());
const deleteBarbero = (id) => axios.delete(`${API_URL}/barberos/${id}`, getAuthHeaders());

// --- Servicios ---
const getServicios = () => axios.get(`${API_URL}/servicios`, getAuthHeaders());
// ... (puedes añadir create, update, delete para servicios de la misma forma)

// --- Agenda ---
const getAgenda = () => axios.get(`${API_URL}/agenda`, getAuthHeaders());

export const adminService = {
    getBarberos,
    createBarbero,
    updateBarbero,
    deleteBarbero,
    getServicios,
    getAgenda
};