// src/components/admin/GestionBarberos.jsx

import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/admin.service';

function GestionBarberos() {
    const [barberos, setBarberos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [editando, setEditando] = useState(null); // Contendrá el barbero a editar

    useEffect(() => {
        cargarBarberos();
    }, []);

    const cargarBarberos = async () => {
        try {
            const res = await adminService.getBarberos();
            setBarberos(res.data);
        } catch (error) {
            alert('Error al cargar los barberos.');
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { Nombre: nombre, Especialidad: especialidad };
        try {
            if (editando) {
                await adminService.updateBarbero(editando.IdBarbero, data);
            } else {
                await adminService.createBarbero(data);
            }
            resetForm();
            cargarBarberos();
        } catch (error) {
            alert('Error al guardar el barbero.');
        }
    };
    
    const handleEdit = (barbero) => {
        setEditando(barbero);
        setNombre(barbero.Nombre);
        setEspecialidad(barbero.Especialidad);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este barbero? (Será marcado como inactivo)')) {
            try {
                await adminService.deleteBarbero(id);
                cargarBarberos();
            } catch (error) {
                alert('Error al eliminar el barbero.');
            }
        }
    };

    const handleToggleEstado = async (barbero) => {
        try {
            const nuevoEstado = !barbero.Activo;
            await adminService.updateBarbero(barbero.IdBarbero, { Activo: nuevoEstado });
            cargarBarberos();
        } catch (error) {
            alert('Error al cambiar el estado del barbero.');
        }
    };

    const resetForm = () => {
        setNombre('');
        setEspecialidad('');
        setEditando(null);
    };

    return (
        <div className="gestion-barberos">
            <h3 className="gestion-barberos-title">{editando ? 'Editando Barbero' : 'Nuevo Barbero'}</h3>
            <form className="gestion-barberos-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="gestion-barberos-input"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    placeholder="Nombre"
                    required
                />
                <input
                    type="text"
                    className="gestion-barberos-input"
                    value={especialidad}
                    onChange={e => setEspecialidad(e.target.value)}
                    placeholder="Especialidad"
                />
                <div className="gestion-barberos-actions">
                    <button type="submit" className="gestion-barberos-button">
                        {editando ? 'Actualizar' : 'Crear'}
                    </button>
                    {editando && (
                        <button type="button" className="gestion-barberos-button gestion-barberos-button-secondary" onClick={resetForm}>
                            Cancelar Edición
                        </button>
                    )}
                </div>
            </form>
            <hr className="gestion-barberos-divider" />
            <h3 className="gestion-barberos-title">Lista de Barberos</h3>
            <div className="gestion-barberos-table-wrapper">
                <table className="gestion-barberos-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Especialidad</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {barberos.map((b, index) => (
                            <tr key={b.IdBarbero} className={index % 2 === 0 ? 'row-even' : 'row-odd'}>
                                <td>{b.Nombre}</td>
                                <td>{b.Especialidad}</td>
                                <td>{b.Activo ? 'Activo' : 'Inactivo'}</td>
                                <td className="gestion-barberos-td-actions">
                                    <button type="button" className="gestion-barberos-button gestion-barberos-table-button" onClick={() => handleEdit(b)}>
                                        Editar
                                    </button>
                                    <button
                                        type="button"
                                        className="gestion-barberos-button gestion-barberos-table-button"
                                        onClick={() => handleToggleEstado(b)}
                                    >
                                        {b.Activo ? 'Desactivar' : 'Activar'}
                                    </button>
                                    <button type="button" className="gestion-barberos-button gestion-barberos-button-secondary" onClick={() => handleDelete(b.IdBarbero)}>
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default GestionBarberos;