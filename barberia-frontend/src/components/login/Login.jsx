// src/components/login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import heroImage from '../../assets/barberialogin.jpg';
    
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
        <div className="login-container">
            <div className="login-background">
                <h1 className="login-welcome">Bienvenido</h1>
            </div>
            <div className="login-grid">
                <div className="login-info" style={{ backgroundImage: `url(${heroImage})` }}>
                    <div className="login-info-overlay"></div>
                </div>
                <div className="login-card">
                    <h2>Iniciar sesión</h2>
                    <form onSubmit={handleLogin}>
                        <div className="login-field">
                            <label htmlFor="usuario">Usuario</label>
                            <input
                                id="usuario"
                                type="text"
                                className="login-input"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                placeholder="Ingresar usuario"
                                required
                            />
                        </div>
                        <div className="login-field">
                            <label htmlFor="clave">Clave</label>
                            <input
                                id="clave"
                                type="password"
                                className="login-input"
                                value={clave}
                                onChange={(e) => setClave(e.target.value)}
                                placeholder="Ingresar clave"
                                required
                            />
                        </div>
                        <button type="submit" className="login-submit">Iniciar sesión</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;