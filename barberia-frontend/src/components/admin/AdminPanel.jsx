// src/components/admin/AdminPanel.jsx

import React, { useState } from 'react';
import GestionBarberos from './GestionBarberos';
import AgendaGeneral from './AgendaGeneral';
// import GestionServicios from './GestionServicios';

function AdminPanel() {
    const [vista, setVista] = useState('barberos'); // barberos, servicios, agenda

    const renderVista = () => {
        switch (vista) {
            case 'barberos':
                return <GestionBarberos />;
            case 'agenda':
                return <AgendaGeneral />;
            // case 'servicios':
            //     return <GestionServicios />;
            default:
                return <GestionBarberos />;
        }
    };

    return (
        <div>
            <h1>Panel de Administración</h1>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button className={`nav-link ${vista === 'barberos' ? 'active' : ''}`} onClick={() => setVista('barberos')}>
                        Gestionar Barberos
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${vista === 'servicios' ? 'active' : ''}`} onClick={() => setVista('servicios')}>
                        Gestionar Servicios
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${vista === 'agenda' ? 'active' : ''}`} onClick={() => setVista('agenda')}>
                        Ver Agenda General
                    </button>
                </li>
            </ul>

            <div className="mt-4">
                {renderVista()}
            </div>
        </div>
    );
}

export default AdminPanel;