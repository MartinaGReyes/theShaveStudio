// models/clientesModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('./configurarSequelize');

const clientes = sequelize.define('clientes', {
  IdCliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Apellido: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Telefono: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true, // El teléfono será el identificador único del cliente
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    validate: {
      isEmail: true,
    }
  },
});

module.exports = clientes;