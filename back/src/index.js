const express = require("express");
const cors = require("cors");
const http = require('http');
const IP = require('ip');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname,'.env')
});

let app = express();
let server = http.createServer(app); 
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

/*-------------------------RUTAS-------------------------- */
const routerAutenticacion = require('./routes/autenticacion.routes.js')
const routerUsuario = require('./routes/usuario.routes.js')
const routerControlAcceso = require('./routes/control-acceso.routes.js')
const routerPanel  = require('./routes/panel.routes.js');
const routerEstadisticas  = require('./routes/estadisticas.routes.js');
const routerAdministrador = require("./routes/administrador.routes.js");

app.use(routerAutenticacion);
app.use(routerUsuario);
app.use(routerControlAcceso);
app.use(routerPanel);
app.use(routerEstadisticas);
app.use(routerAdministrador);
/*-------------------------FIN RUTAS----------------------- */

/*-------------------------SOCKET-------------------------- */
const io = require('socket.io')(server, {
    cors: {
      origin: "*",  // Allow all origins
      methods: ["GET", "POST"]
    }
});
// Adjuntamos la instancia io a la aplicación Express
app.io = io;
io.on('connection', () => {
    console.log("Conexion al socket exitosa");
});
/*-------------------------FIN SOCKET---------------------- */


/*----------------------PUERTOS SERIALES------------------- */
/*
  Estos se usan cuando los lectores estaran en el mismo lugar que el backend
  El archivo de pruebas.js se usa para conocer que es lo que esta recibiendo el lector
*/
// require('./controllers/pruebas.js')(io);
// require('./controllers/serial_salida.js')(io);
// require('./controllers/serial_entrada.js')(io);
/*--------------------FIN PUERTOS SERIALES------------------ */


// INICIAR SERVIDOR
const PORT = process.env.PORT || 3000;
server.listen(PORT,"0.0.0.0", () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


//Obtener el ip del servidor
app.get('/', (req, res) => {
    const ipAddress = IP.address();
    res.send(ipAddress)
})

module.exports = app; 
