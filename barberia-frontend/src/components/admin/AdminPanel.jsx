// src/components/admin/AdminPanel.jsx

import React, { useState } from 'react';
import GestionBarberos from './GestionBarberos';
import AgendaGeneral from './AgendaGeneral';

function GestionServicios() {
    return (
        <div>
            <h2>Gestionar Servicios</h2>
            <p>Aquí podrás administrar los servicios ofrecidos en la barbería.</p>
        </div>
    );
}

function AdminPanel() {
    const [vista, setVista] = useState('barberos'); // barberos, servicios, agenda

    const renderVista = () => {
        switch (vista) {
            case 'barberos':
                return <GestionBarberos />;
            case 'servicios':
                return <GestionServicios />;
            case 'agenda':
                return <AgendaGeneral />;
            default:
                return <GestionBarberos />;
        }
    };

    return (
        <div className="admin-panel">
            <div className="admin-layout">
                <aside className="admin-sidebar">
                    <div className="admin-brand">
                        <div className="admin-brand-icon"></div>
                        <div>
                            <div className="admin-brand-title">The Shave</div>
                            <div className="admin-brand-subtitle">Studio</div>
                        </div>
                    </div>

                    <div className="admin-menu-wrapper">
                        <nav className="admin-menu">
                            <button className={`admin-menu-item ${vista === 'barberos' ? 'active' : ''}`} onClick={() => setVista('barberos')}>
                                <span className="admin-menu-item-icon">👨‍🔧</span>
                                Gestionar Barberos
                            </button>
                            <button className={`admin-menu-item ${vista === 'servicios' ? 'active' : ''}`} onClick={() => setVista('servicios')}>
                                <span className="admin-menu-item-icon">🔧</span>
                                Gestionar Servicios
                            </button>
                            <button className={`admin-menu-item ${vista === 'agenda' ? 'active' : ''}`} onClick={() => setVista('agenda')}>
                                <span className="admin-menu-item-icon">📅</span>
                                Ver Agenda General
                            </button>
                        </nav>
                    </div>

                    <div className="admin-sidebar-footer">
                        <button className="admin-logout" onClick={() => alert('Cerrar sesión')}>
                            <span>↩</span>
                            Cerrar sesión
                        </button>
                    </div>
                </aside>
                <main className="admin-content">
                    <h1>Panel de Administración</h1>
                    {renderVista()}
                </main>
            </div>
        </div>
    );
}

export default AdminPanel;