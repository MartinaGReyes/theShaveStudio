// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Turnero from './components/turnero/Turnero';
import Login from './components/login/Login';
import Agenda from './components/agenda/Agenda';
import AdminPanel from './components/admin/AdminPanel';
import logoBarberia from './assets/logobarberiaproyecto.jpg';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Menú de Navegación Responsivo COMPLETO */}
        <nav className="navbar navbar-expand-lg navbar-light mb-4" style={{ backgroundColor: '#6fa4da' }}>
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src={logoBarberia} alt="The Shave Studio Logo" style={{ height: '40px', marginRight: '10px' }} />
              <span>The Shave Studio</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              </ul>
              {/* Añadimos un enlace para el login a la derecha */}
              <ul className="navbar-nav">
                  <li className="nav-item">
                      <Link className="nav-link" to="/login">Login Personal</Link>
                  </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* El contenido principal ocupará el espacio disponible */}
        <main className="container mt-3 flex-grow-1">
          {/* Definición de Rutas */}
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/solicitar-turno" element={<Turnero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/agenda" element={<Agenda />} /> {/* Esta ruta debería ser protegida */}
            <Route path="/admin" element={<AdminPanel />} /> {/* Nueva ruta */}
          </Routes>
        </main>

        {/* Footer siempre al pie */}
        <Footer />
      </div>
    </Router>
  );
}

// Componente simple para la página de inicio
function Inicio() {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-5">
      <h2>Bienvenido a The Shave Studio</h2>
      <p className="lead mb-4">Tu barbería de confianza</p>
      <button 
        className="btn btn-secondary btn-lg"
        onClick={() => navigate('/solicitar-turno')}
      >
        Solicitar Turno
      </button>
    </div>
  );
}

export default App;