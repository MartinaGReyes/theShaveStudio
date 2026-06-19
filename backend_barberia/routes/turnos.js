// routes/turnos.js

const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const sequelize = require('../models/configurarSequelize');

// Importamos todos los modelos que necesitamos
const turnos = require('../models/turnosModel');
const clientes = require('../models/clientesModel');
const servicios = require('../models/serviciosModel');
const { authenticateJWT } = require('../auth');

// --- ENDPOINT CLAVE: OBTENER HORARIOS DISPONIBLES ---
// GET /api/turnos/disponibles?fecha=YYYY-MM-DD&idBarbero=X&idServicio=Y
router.get('/api/turnos/disponibles', async (req, res) => {
  const { fecha, idBarbero, idServicio } = req.query;

  if (!fecha || !idBarbero || !idServicio) {
    return res.status(400).json({ message: 'Faltan parámetros: fecha, idBarbero y idServicio son requeridos.' });
  }

  try {
    // 1. Obtener la duración del servicio
    const servicio = await servicios.findByPk(idServicio);
    if (!servicio) {
      return res.status(404).json({ message: 'Servicio no encontrado.' });
    }
    const duracionServicio = servicio.DuracionMinutos;

    // 2. Definir horario laboral (se puede mover a una config o a la tabla de barberos)
    const horaInicioJornada = 9;
    const horaFinJornada = 18;

    // 3. Obtener turnos ya reservados para ese barbero en esa fecha
    const inicioDia = new Date(`${fecha}T00:00:00`);
    const finDia = new Date(`${fecha}T23:59:59`);

    const turnosReservados = await turnos.findAll({
      where: {
        IdBarbero: idBarbero,
        FechaHora: {
          [Op.between]: [inicioDia, finDia]
        }
      }
    });
    
    // 4. Generar lista de horarios disponibles
    const horariosDisponibles = [];
    // Usamos un intervalo base (ej. 15 minutos) para generar los slots
    const intervaloMinutos = 15; 
    let horaActual = new Date(inicioDia);
    horaActual.setHours(horaInicioJornada, 0, 0, 0);

    while (horaActual.getHours() < horaFinJornada) {
      let slotDisponible = true;
      const finSlotPropuesto = new Date(horaActual.getTime() + duracionServicio * 60000);

      // Si el turno propuesto termina después de la jornada, no está disponible
      if (finSlotPropuesto.getHours() > horaFinJornada || (finSlotPropuesto.getHours() === horaFinJornada && finSlotPropuesto.getMinutes() > 0)) {
        slotDisponible = false;
      }
      
      // Comprobar si el slot se solapa con algún turno reservado
      for (const turno of turnosReservados) {
        const inicioTurnoReservado = new Date(turno.FechaHora);
        const servicioTurnoReservado = await servicios.findByPk(turno.IdServicio);
        const finTurnoReservado = new Date(inicioTurnoReservado.getTime() + servicioTurnoReservado.DuracionMinutos * 60000);

        // Lógica de solapamiento
        if (horaActual < finTurnoReservado && finSlotPropuesto > inicioTurnoReservado) {
          slotDisponible = false;
          break; // Si se solapa con uno, no hace falta seguir comprobando
        }
      }

      if (slotDisponible) {
        horariosDisponibles.push(horaActual.toTimeString().slice(0, 5));
      }
      
      // Avanzamos al siguiente slot posible
      horaActual = new Date(horaActual.getTime() + intervaloMinutos * 60000);
    }

    res.json(horariosDisponibles);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al calcular la disponibilidad.' });
  }
});


// --- ENDPOINT: CREAR UN NUEVO TURNO ---
// POST /api/turnos
router.post('/api/turnos', async (req, res) => {
  let { FechaHora, IdBarbero, IdServicio, Nombre, Apellido, Telefono, Email } = req.body;

  if (!FechaHora || !IdBarbero || !IdServicio || !Nombre || !Apellido || !Telefono) {
    return res.status(400).json({ message: 'Faltan datos para crear el turno.' });
  }

  if (Email === '') {
    Email = null;
  }

  const t = await sequelize.transaction(); // Iniciar transacción

  try {
    // 1. Buscar o crear el cliente por su número de teléfono
    const [cliente, creado] = await clientes.findOrCreate({
      where: { Telefono: Telefono },
      defaults: { Nombre, Apellido, Email },
      transaction: t,
    });

    // 2. Crear el turno
    const nuevoTurno = await turnos.create({
      FechaHora,
      IdBarbero,
      IdServicio,
      IdCliente: cliente.IdCliente,
      Estado: 'Confirmado'
    }, { transaction: t });

    await t.commit(); // Si todo va bien, confirmar la transacción

    res.status(201).json(nuevoTurno);
  } catch (error) {
    await t.rollback(); // Si algo falla, deshacer todo
    console.error(error);
    res.status(500).json({ message: 'Error al crear el turno.', error: error.message });
  }
});


// --- ENDPOINTS PARA GESTIÓN (ADMIN/BARBERO) ---

// GET /api/turnos?fecha=YYYY-MM-DD&idBarbero=X - Ver agenda
router.get('/api/turnos', async (req, res) => {
    const { fecha, idBarbero } = req.query;
    let where = {};
    if (fecha) {
        const inicioDia = new Date(`${fecha}T00:00:00`);
        const finDia = new Date(`${fecha}T23:59:59`);
        where.FechaHora = { [Op.between]: [inicioDia, finDia] };
    }
    if (idBarbero) {
        where.IdBarbero = idBarbero;
    }

    try {
        const items = await turnos.findAll({ 
            where,
            include: [
                { model: clientes, as: 'cliente', attributes: ['Nombre', 'Apellido'] },
                { model: servicios, as: 'servicio', attributes: ['Nombre'] },
                { model: require('../models/barberosModel'), as: 'barbero', attributes: ['Nombre'] }
            ],
            order: [['FechaHora', 'ASC']]
        });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los turnos' });
    }
});


router.get('/api/agenda', authenticateJWT, async (req, res) => {
    const { idBarbero, rol } = req.user; // Obtenemos los datos del usuario desde el token

    let where = {};
    if (rol === 'Barbero') {
        where.IdBarbero = idBarbero;
    }
    // Si es Admin, no filtramos por barbero, así puede ver todo.

    // Opcional: filtrar por fecha
    if(req.query.fecha) {
        const fecha = req.query.fecha;
        const inicioDia = new Date(`${fecha}T00:00:00.000Z`);
        const finDia = new Date(`${fecha}T23:59:59.999Z`);
        where.FechaHora = { [Op.between]: [inicioDia, finDia] };
    }

    try {
        const turnosDelBarbero = await turnos.findAll({
            where,
            include: [ // Incluimos datos relacionados para mostrarlos en la agenda
                { model: clientes, as: 'cliente', attributes: ['Nombre', 'Apellido'] },
                { model: servicios, as: 'servicio', attributes: ['Nombre'] }
            ],
            order: [['FechaHora', 'ASC']]
        });
        res.json(turnosDelBarbero);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la agenda' });
    }
});


// PUT /api/turnos/:idTurno - Actualizar estado de un turno
router.put('/api/turnos/:idTurno', async (req, res) => {
    const { Estado } = req.body;
    if (!Estado) {
        return res.status(400).json({ message: 'El campo Estado es requerido.' });
    }
    try {
        const turno = await turnos.findByPk(req.params.idTurno);
        if (!turno) {
            return res.status(404).json({ message: 'Turno no encontrado.' });
        }
        turno.Estado = Estado;
        await turno.save();
        res.status(200).json(turno);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el turno.' });
    }
});


module.exports = router;