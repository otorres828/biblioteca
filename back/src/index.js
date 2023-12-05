const fastify = require("fastify")({ logger: true });
const fastifySocketIO = require("fastify-socket.io");
const fastifyCors = require('@fastify/cors');

const IP = require("ip");
const dotenv = require("dotenv");
const path = require("path");

fastify.register(fastifyCors, {
 origin: "*", // Allow all origins
 methods: ["GET", "POST"]
});
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

const routerAutenticacion = require("./routes/autenticacion.routes.js");
const routerUsuario = require('./routes/usuario.routes.js')
const routerControlAcceso = require('./routes/control-acceso.routes.js')
const routerPanel  = require('./routes/panel.routes.js');
const routerEstadisticas  = require('./routes/estadisticas.routes.js');
const routerAdministrador = require("./routes/administrador.routes.js");
const routerCargaMasiva = require("./routes/carga-masiva.routes.js");

fastify.register(routerAutenticacion);
fastify.register(routerAdministrador);
fastify.register(routerUsuario);
fastify.register(routerControlAcceso);
fastify.register(routerPanel);
fastify.register(routerEstadisticas);
fastify.register(routerCargaMasiva);

/*-------------------------SOCKET-------------------------- */
fastify.register(fastifySocketIO, {
 cors: {
   origin: "*",  // Allow all origins
   methods: ["GET", "POST"]
 }
});

fastify.ready((err) => {
 if (err) throw err;
 const io = fastify.io;
 io.on('connection', () => {
   console.log("Conexion al socket exitosa");
 });
});

// Verificar si el decorador 'io' ya existe
if (fastify.hasDecorator('io')) {
  // Adjuntar la instancia io a fastify
  fastify.decorate('io', fastify.io);
}

/*----------------------FIN SOCKET-------------------------- */


// INICIAR SERVIDOR
const PORT = process.env.PORT || 3000;
fastify.listen(PORT, "0.0.0.0", (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Servidor corriendo en el puerto ${PORT}`);
});

//Obtener el ip del servidor
fastify.get("/", (req, reply) => {
  reply.send(IP.address());
});

module.exports = fastify;
