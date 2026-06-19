// src/services/auth.service.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:3000/api';

const login = async (usuario, clave) => {
    const response = await axios.post(`${API_URL}/login`, { usuario, clave });
    if (response.data.accessToken) {
        // Guardamos el token en el almacenamiento local del navegador
        localStorage.setItem('user_token', response.data.accessToken);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user_token');
};

const getToken = () => {
    return localStorage.getItem('user_token');
};

const getCurrentUser = () => {
    const token = getToken();
    if (!token) {
        return null; // No hay usuario logueado
    }
    try {
        // Decodificamos el token para obtener los datos del payload
        const decodedUser = jwtDecode(token);
        return decodedUser;
    } catch (error) {
        // Si el token es inválido o ha expirado, jwt-decode lanzará un error
        console.error("Token inválido:", error);
        logout(); // Limpiamos el token inválido
        return null;
    }
};

export const authService = {
    login,
    logout,
    getToken,
    getCurrentUser,
};