// index.js

const express = require("express");
const cors = require("cors");
const inicializarBase = require("./models/inicializarBase");

// Crear servidor
const app = express();

// Middlewares
app.use(express.json()); // Para poder leer JSON en el body de las peticiones
app.use(cors());         // Para permitir peticiones desde otros orígenes

// Mensaje de bienvenida en la ruta raíz
app.get("/", (req, res) => {
  res.send("Backend de la Barbería!");
});

// Conectar las rutas (¡las crearemos en el siguiente paso!)
const barberosRouter = require('./routes/barberos');
app.use(barberosRouter);

const serviciosRouter = require('./routes/servicios');
app.use(serviciosRouter);

const clientesRouter = require('./routes/clientes');
app.use(clientesRouter);

const turnosRouter = require('./routes/turnos');
app.use(turnosRouter);

const seguridadRouter = require('./routes/seguridad');
app.use(seguridadRouter);

// Levantar el servidor
const port = 3000;
app.locals.fechaInicio = new Date();

// Inicializamos la base de datos y luego levantamos el servidor
inicializarBase().then(() => {
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
});