const { DataTypes } = require('sequelize');
const sequelize = require('./configurarSequelize');

const barberos = sequelize.define('barberos', {
  IdBarbero: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  Especialidad: {
    type: DataTypes.STRING(100),
  },
  Activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  FotoURL: {
    type: DataTypes.STRING(255),
  }
});

module.exports = barberos;