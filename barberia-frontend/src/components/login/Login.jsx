// src/components/login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';
    
function Login() {
    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const navigate = useNavigate();
    const { loginContext } = useAuth();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginContext(usuario, clave); // Llamamos a la función del contexto
            // Redirigir según el rol
            if (user.rol === 'Admin') {
                navigate('/admin');
            } else {
                navigate('/agenda');
            }
        } catch (error) {
            alert('Error al iniciar sesión: ' + (error.response?.data?.message || 'Verifique sus credenciales'));
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label>Usuario</label>
                    <input type="text" className="form-control" onChange={(e) => setUsuario(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label>Clave</label>
                    <input type="password"className="form-control" onChange={(e) => setClave(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Ingresar</button>
            </form>
        </div>
    );
}

export default Login;