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
        <div>
            <h3>{editando ? 'Editando Barbero' : 'Nuevo Barbero'}</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" required />
                <input type="text" value={especialidad} onChange={e => setEspecialidad(e.target.value)} placeholder="Especialidad" />
                <button type="submit">{editando ? 'Actualizar' : 'Crear'}</button>
                {editando && <button type="button" onClick={resetForm}>Cancelar Edición</button>}
            </form>
            <hr />
            <h3>Lista de Barberos</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Especialidad</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {barberos.map(b => (
                        <tr key={b.IdBarbero}>
                            <td>{b.Nombre}</td>
                            <td>{b.Especialidad}</td>
                            <td>{b.Activo ? 'Activo' : 'Inactivo'}</td>
                            <td>
                                <button className="btn btn-sm btn-info me-2" onClick={() => handleEdit(b)}>Editar</button>
                                <button 
                                    className={`btn btn-sm me-2 ${b.Activo ? 'btn-warning' : 'btn-success'}`}
                                    onClick={() => handleToggleEstado(b)}
                                >
                                    {b.Activo ? 'Desactivar' : 'Activar'}
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(b.IdBarbero)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionBarberos;