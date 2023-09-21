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

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// SE ESCUCHAN LOS PUERTOS SERIALES Y EL SOCKT
require('./controllers/pruebas.js')(io);
// require('./controllers/serial_salida.js')(io);
// require('./controllers/serial_entrada.js')(io);

// INICIAR SERVIDOR
const PORT = process.env.PORT || PORT;
server.listen(PORT,"0.0.0.0", () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


app.get('/', (req, res) => {
    const ipAddress = IP.address();
    res.send(ipAddress)
})

module.exports = app; // Cambiado de io a app
