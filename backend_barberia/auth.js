// auth.js
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'b4rb3r14_pr0y3ct0'; // Debe ser el mismo que en seguridad.js

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Formato: Bearer TOKEN

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Token inválido o expirado
            }
            req.user = user; // Añadimos los datos del usuario a la request
            next();
        });
    } else {
        res.sendStatus(401); // No hay token
    }
};

const authorizeAdmin = (req, res, next) => {
    // Este middleware debe ejecutarse DESPUÉS de authenticateJWT
    if (req.user && (req.user.rol === 'Admin' || req.user.rol === 'admin')) {
        next(); // El usuario es Admin, puede continuar
    } else {
        res.status(403).json({ message: 'Acceso denegado. Se requiere rol de Administrador.' });
    }
};
module.exports = {
    authenticateJWT,
    authorizeAdmin,
    accessTokenSecret
};