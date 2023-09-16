const express = require('express');
const verify = require('../middleware/verify.js');
const {
    ingresos_usuarios_agregar,
    ingresos_usuarios_desagregar
} = require('../controllers/EstadisticasController.js');

const routerEstadisticas = express.Router();

routerEstadisticas.post('/estadisticas/usuarios/agregar',verify, ingresos_usuarios_agregar);
routerEstadisticas.post('/estadisticas/usuarios/desagregar',verify, ingresos_usuarios_desagregar);


module.exports = routerEstadisticas;
