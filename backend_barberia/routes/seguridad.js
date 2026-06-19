// routes/seguridad.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usuarios = require('../models/usuariosModel');

const accessTokenSecret = 'b4rb3r14_pr0y3ct0'; 

// POST /api/login
router.post('/api/login', async (req, res) => {
    const { usuario, clave } = req.body;

    try {
        const user = await usuarios.findOne({ 
            where: { NombreUsuario: usuario, Clave: clave } 
        });

        if (user) {
            // Generar el token
            const accessToken = jwt.sign(
                { 
                    id: user.IdUsuario,
                    usuario: user.NombreUsuario, 
                    rol: user.Rol,
                    idBarbero: user.IdBarberoAsociado 
                }, 
                accessTokenSecret, 
                { expiresIn: '8h' } // El token expira en 8 horas
            );
            
            res.json({
                message: `Bienvenido ${user.NombreUsuario}`,
                accessToken
            });
        } else {
            res.status(401).json({ message: 'Usuario o clave incorrectos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;