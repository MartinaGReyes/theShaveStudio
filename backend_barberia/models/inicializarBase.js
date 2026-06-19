// models/inicializarBase.js

const sequelize = require('./configurarSequelize');
const barberos = require('./barberosModel');
const servicios = require('./serviciosModel');
const clientes = require('./clientesModel');
const turnos = require('./turnosModel');
const usuarios = require('./usuariosModel');

async function inicializarBase() {
  try {
    // Sincroniza los modelos con la base de datos (crea las tablas si no existen)
    await sequelize.sync({ alter: true }); // force: true borra y recrea las tablas. ¡CUIDADO EN PRODUCCIÓN!

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