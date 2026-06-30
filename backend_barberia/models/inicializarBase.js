// models/inicializarBase.js

const sequelize = require('./configurarSequelize');
const barberos = require('./barberosModel');
const servicios = require('./serviciosModel');
const clientes = require('./clientesModel');
const turnos = require('./turnosModel');
const usuarios = require('./usuariosModel');

async function limpiarTablasBackup() {
  const queryInterface = sequelize.getQueryInterface();
  const tables = await queryInterface.showAllTables();

  for (const tableName of tables) {
    if (typeof tableName === 'string' && tableName.endsWith('_backup')) {
      console.log(`Eliminando tabla de respaldo antigua: ${tableName}`);
      await queryInterface.dropTable(tableName);
    }
  }
}

const fs = require('fs');

async function inicializarBase() {
  try {
    // Eliminar tablas de respaldo viejas que pueden quedar de una sincronización fallida
    await limpiarTablasBackup();

    // Evitamos alteraciones destructivas en SQLite si ya existe la base de datos
    const dbExists = fs.existsSync('./.data/barberia.db');
    if (dbExists) {
      console.log('Base de datos existente detectada, sincronizando sin alteraciones.');
      await sequelize.sync();
    } else {
      console.log('Base de datos no existente, creando tablas nuevas.');
      await sequelize.sync();
    }

    const barberosCount = await barberos.count();
    if (barberosCount === 0) {
        console.log("Base de datos vacía, insertando datos de prueba...");
        await DatosBarberos();
        await DatosServicios();
        await DatosUsuarios();
    } else {
        console.log("La base de datos ya contiene datos.");
    }
    
    console.log('Base de datos sincronizada correctamente.');

  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
}

async function DatosBarberos() {
  await barberos.bulkCreate([
    { Nombre: 'Carlos "El Filo" Pérez', Especialidad: 'Cortes Clásicos', FotoURL: 'https://via.placeholder.com/150', Activo: true },
    { Nombre: 'Sofía "La Navaja" Gómez', Especialidad: 'Barbas y Afeitado', FotoURL: 'https://via.placeholder.com/150', Activo: true },
    { Nombre: 'Miguel "El Moderno" Rodríguez', Especialidad: 'Cortes Modernos y Color', FotoURL: 'https://via.placeholder.com/150', Activo: false },
  ]);
}

async function DatosServicios() {
  await servicios.bulkCreate([
    { Nombre: 'Corte de Cabello', Precio: 8000.00, DuracionMinutos: 30 },
    { Nombre: 'Afeitado Clásico con Navaja', Precio: 6500.00, DuracionMinutos: 45 },
    { Nombre: 'Corte y Barba', Precio: 12000.00, DuracionMinutos: 60 },
    { Nombre: 'Perfilado de Barba', Precio: 4000.00, DuracionMinutos: 20 },
  ]);
}
async function DatosUsuarios() {
  await usuarios.bulkCreate([
    // Un usuario Administrador
    { NombreUsuario: 'admin', Clave: 'admin123', Rol: 'Admin', IdBarberoAsociado: null },
    // Un usuario para el Barbero Carlos (IdBarbero = 1)
    { NombreUsuario: 'carlos', Clave: 'carlos123', Rol: 'Barbero', IdBarberoAsociado: 1 },
    // Un usuario para la Barbera Sofía (IdBarbero = 2)
    { NombreUsuario: 'sofia', Clave: 'sofia123', Rol: 'Barbero', IdBarberoAsociado: 2 },
  ]);
}


module.exports = inicializarBase;