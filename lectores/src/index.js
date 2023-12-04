const express = require("express");
const cors = require("cors");
const http = require('http');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname,'.env')
});

let app = express();
let server = http.createServer(app); 

/*---------------------------- SOCKET---------------------- */
const io = require('socket.io')(server, {
    cors: {
      origin: "*",  // Allow all origins
      methods: ["GET", "POST"]
    }
});
// Adjuntar la instancia io a la aplicación Express
app.io = io;
io.on('connection', () => {
    console.log("Conexion al socket exitosa");
});
/*-------------------------FIN SOCKET---------------------- */


app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


/*----------------------PUERTOS SERIALES------------------- */
/*
  los archivos serial_entrada y serial_salida, se usan para habilitar los lectores,
  dentro de dichos arcivos, se hace una peticion a la api del backend que procesara la 
  informacion de las tarjetas. Se debe descomentar solo los archivos que se planean usar.
  Ejemplo: Si se levante un servidor de esta carpeta y el servidor vive en una computadora
  pero la computadora solo tiene conectado un lector, debe de habilitarse solo el archivo 
  correspondiente a ese lector que se tiene habilitado.
*/
// require('./controllers/pruebas.js')(io);
// require('./controllers/serial_entrada.js')(io);
// require('./controllers/serial_salida.js')(io);
/*--------------------FIN PUERTOS SERIALES------------------ */


// INICIAR SERVIDOR
const PORT = process.env.PORT || PORT;
server.listen(PORT,"0.0.0.0", () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app; // Cambiado de io a app
