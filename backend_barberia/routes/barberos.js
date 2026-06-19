const express = require('express');
const router = express.Router();
const barberos = require('../models/barberosModel');
const { authenticateJWT, authorizeAdmin } = require('../auth');

// GET /api/barberos - Obtener todos los barberos activos
router.get('/api/barberos', async (req, res) => {
  try {
    const items = await barberos.findAll({ where: { Activo: true } });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los barberos' });
  }
});

// GET /api/admin/barberos - Obtener TODOS los barberos (activos e inactivos)
router.get('/api/admin/barberos', [authenticateJWT, authorizeAdmin], async (req, res) => {
    try {
        const items = await barberos.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los barberos' });
    }
});

// POST /api/admin/barberos - Crear un nuevo barbero
router.post('/api/admin/barberos', [authenticateJWT, authorizeAdmin], async (req, res) => {
    try {
        const nuevoBarbero = await barberos.create(req.body);
        res.status(201).json(nuevoBarbero);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el barbero', error });
    }
});

// PUT /api/admin/barberos/:id - Actualizar un barbero
router.put('/api/admin/barberos/:id', [authenticateJWT, authorizeAdmin], async (req, res) => {
    try {
        const barbero = await barberos.findByPk(req.params.id);
        if (!barbero) {
            return res.status(404).json({ message: 'Barbero no encontrado' });
        }
        await barbero.update(req.body);
        res.json(barbero);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el barbero', error });
    }
});

// DELETE /api/admin/barberos/:id - Eliminar un barbero (baja lógica)
router.delete('/api/admin/barberos/:id', [authenticateJWT, authorizeAdmin], async (req, res) => {
    try {
        const barbero = await barberos.findByPk(req.params.id);
        if (!barbero) {
            return res.status(404).json({ message: 'Barbero no encontrado' });
        }
        // Hacemos una baja lógica cambiando el estado a inactivo
        barbero.Activo = false;
        await barbero.save();
        res.status(204).send(); // No Content
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el barbero', error });
    }
});

module.exports = router;
