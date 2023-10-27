const express = require("express");
const cors = require("cors");
const http = require('http');
const IP = require('ip');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname,'.env')
});
// --------------------DATABASE------------------------
const sequelize = require("../config/database.js");
// ----------------------------------------------------
const routerAutenticacion = require('./routes/autenticacion.routes.js')
const routerUsuario = require('./routes/usuario.routes.js')
const routerControlAcceso = require('./routes/control-acceso.routes.js')
const routerPanel  = require('./routes/panel.routes.js');
const routerEstadisticas  = require('./routes/estadisticas.routes.js');
const routerAdministrador = require("./routes/administrador.routes.js");


sequelize.sync().then(()=>console.log('corriendo'))
// async function start() {
//   await sequelize.seed("tipos");
// }
// start();


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

app.use(routerAutenticacion);
app.use(routerUsuario);
app.use(routerControlAcceso);
app.use(routerPanel);
app.use(routerEstadisticas);
app.use(routerAdministrador);

// INICIAR SERVIDOR
const PORT = process.env.PORT || 3000;
server.listen(PORT,"0.0.0.0", () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


app.get('/', (req, res) => {
    const ipAddress = IP.address();
    res.send(ipAddress)
})


module.exports = app; // Cambiado de io a app
