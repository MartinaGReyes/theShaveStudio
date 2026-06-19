// models/configurarSequelize.js

const { Sequelize } = require('sequelize');

// Configuración de la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './.data/barberia.db', // Nombre del archivo de la base de datos
  // Opciones para desactivar los mensajes de Sequelize en la consola
  logging: false, 
  define: {
    // Opciones globales de los modelos
    freezeTableName: true,  // No pluraliza los nombres de las tablas
    timestamps: false,      // No crea campos de fecha de creación/modificación
  },
});

module.exports = sequelize;