// routes/clientes.js

const express = require('express');
const router = express.Router();
const clientes = require('../models/clientesModel');

// GET /api/clientes - Obtener todos los clientes (para uso del admin)
router.get('/api/clientes', async (req, res) => {
  try {
    const items = await clientes.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los clientes' });
  }
});

module.exports = router;