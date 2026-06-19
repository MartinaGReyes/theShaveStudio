const { DataTypes } = require('sequelize');
const sequelize = require('./configurarSequelize');

const servicios = sequelize.define('servicios', {
  IdServicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  DuracionMinutos: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = servicios;