// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Turnero from './components/turnero/Turnero';
import Login from './components/login/Login';
import Agenda from './components/agenda/Agenda';
import AdminPanel from './components/admin/AdminPanel';
import logoBarberia from './assets/logobarberiaproyecto.jpg';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-shell d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src={logoBarberia} alt="The Shave Studio Logo" style={{ height: '40px', marginRight: '10px' }} />
              <span>The Shave Studio</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login Personal</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container mt-3 flex-grow-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/solicitar-turno" element={<Turnero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

function Inicio() {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-copy">
        <h2 className="hero-title">Bienvenido a The Shave Studio</h2>
        <p className="hero-subtitle">Tu barbería de confianza para cortes, cuidado y estilo.</p>
        <button className="hero-cta-btn" onClick={() => navigate('/solicitar-turno')}>
          Solicitar Turno
        </button>
      </div>

      <div className="hero-carousel-wrap">
        <div id="homeCarousel" className="carousel slide hero-carousel-card" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#homeCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="carousel-slide">
                <span className="carousel-badge">Servicio estrella</span>
                <h3>Estilo clásico</h3>
                <p>Barba y corte con atención personalizada para una imagen impecable.</p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carousel-slide">
                <span className="carousel-badge">Experiencia premium</span>
                <h3>Ambiente exclusivo</h3>
                <p>Disfrutá de una atención relajada, elegante y cercana en cada visita.</p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carousel-slide">
                <span className="carousel-badge">Reserva fácil</span>
                <h3>Turnos en minutos</h3>
                <p>Elegí tu servicio, tu barber y reservá desde cualquier dispositivo.</p>
              </div>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#homeCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#homeCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;