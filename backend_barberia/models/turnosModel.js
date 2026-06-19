// models/turnosModel.js

const { DataTypes } = require('sequelize');
const sequelize = require('./configurarSequelize');
const clientes = require('./clientesModel');
const servicios = require('./serviciosModel');
const barberos = require('./barberosModel');

const turnos = sequelize.define('turnos', {
  IdTurno: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  FechaHora: {
    type: DataTypes.DATE, // Almacenará fecha y hora completas
    allowNull: false,
  },
  IdCliente: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Aquí se definirá la referencia a la tabla 'clientes'
  },
  IdBarbero: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Aquí se definirá la referencia a la tabla 'barberos'
  },
  IdServicio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Aquí se definirá la referencia a la tabla 'servicios'
  },
  Estado: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'Pendiente', // Estado inicial por defecto
    validate: {
      isIn: [['Pendiente', 'Confirmado', 'Cancelado', 'Completado']],
    }
  }
});

turnos.belongsTo(clientes, { foreignKey: 'IdCliente', as: 'cliente' });
turnos.belongsTo(servicios, { foreignKey: 'IdServicio', as: 'servicio' });
turnos.belongsTo(barberos, { foreignKey: 'IdBarbero', as: 'barbero' });

module.exports = turnos;