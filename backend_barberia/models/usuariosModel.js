// models/usuariosModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('./configurarSequelize');

const usuarios = sequelize.define('usuarios', {
  IdUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  NombreUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  Clave: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Rol: {
    type: DataTypes.STRING, // 'Admin', 'Barbero'
    allowNull: false
  },
  // Opcional: Para vincular directamente este login a un barbero específico
  IdBarberoAsociado: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
});

module.exports = usuarios;