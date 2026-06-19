// src/context/AuthContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/auth.service';

// 1. Crear el contexto
const AuthContext = createContext(null);

// 2. Crear el Proveedor del Contexto (un componente que envolverá nuestra app)
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // useEffect para comprobar si hay un usuario logueado al cargar la app
    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const loginContext = async (usuario, clave) => {
        await authService.login(usuario, clave);
        const user = authService.getCurrentUser();
        setCurrentUser(user);
        return user; // Devolvemos el usuario para que el componente Login pueda redirigir
    };

    const logoutContext = () => {
        authService.logout();
        setCurrentUser(null);
    };

    const value = {
        currentUser,
        loginContext,
        logoutContext,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Crear un "hook" personalizado para usar el contexto fácilmente
export const useAuth = () => {
    return useContext(AuthContext);
};