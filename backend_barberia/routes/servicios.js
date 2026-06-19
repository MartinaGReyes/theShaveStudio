const express = require('express');
const router = express.Router();
const servicios = require('../models/serviciosModel');
const { authenticateJWT, authorizeAdmin } = require('../auth');

// GET /api/servicios - Obtener todos los servicios
router.get('/api/servicios', async (req, res) => {
  try {
    const items = await servicios.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los servicios' });
  }
});

// GET /api/admin/servicios - Obtener TODOS los servicios
router.get('/api/admin/servicios', [authenticateJWT, authorizeAdmin], async (req, res) => {
    try {
        const items = await servicios.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los servicios' });
    }
});

// POST /api/admin/servicios - Crear un nuevo servicio
router.post('/api/admin/servicios', [authenticateJWT, authorizeAdmin], async (req, res) => {
    try {
        const nuevoServicio = await servicios.create(req.body);
        res.status(201).json(nuevoServicio);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el servicio', error });
    }
});

// PUT /api/admin/servicios/:id - Actualizar un servicio
router.put('/api/admin/servicios/:id', [authenticateJWT, authorizeAdmin], async (req, res) => {
    try {
        const servicio = await servicios.findByPk(req.params.id);
        if (!servicio) return res.status(404).json({ message: 'Servicio no encontrado' });
        await servicio.update(req.body);
        res.json(servicio);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el servicio', error });
    }
});

// DELETE /api/admin/servicios/:id - Eliminar un servicio (eliminación física)
router.delete('/api/admin/servicios/:id', [authenticateJWT, authorizeAdmin], async (req, res) => {
    try {
        const result = await servicios.destroy({ where: { IdServicio: req.params.id } });
        if (result === 0) return res.status(404).json({ message: 'Servicio no encontrado' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el servicio', error });
    }
});

module.exports = router;