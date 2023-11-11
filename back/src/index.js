const fastify = require('fastify')({ logger: true });
const IP = require('ip');
const dotenv = require('dotenv');
const path = require('path');


const routerAutenticacion = require('./routes/autenticacion.routes.js')

fastify.register(routerAutenticacion);

dotenv.config({
  path: path.resolve(__dirname,'.env')
});

/*-------------------------SOCKET-------------------------- */
// const io = require('socket.io')(fastify, {
//     cors: {
//       origin: "*",  // Allow all origins
//       methods: ["GET", "POST"]
//     }
// });

// fastify.io = io;
// io.on('connection', () => {
//     console.log("Conexion al socket exitosa");
// });


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
fastify.get('/', (req, res) => {
    const ipAddress = IP.address();
    res.send(ipAddress)
})

module.exports = fastify; 
