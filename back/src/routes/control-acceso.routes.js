const express = require('express');
const verify = require('../middleware/verify.js');

const { validar_tarjeta_entrada,
    validar_tarjeta_salida,
    historial,
    entrar_salir ,
    personas_edificio,
    ingresaron_salieron_hoy, 
    estadisticas_ingreso_hora,
} = require('../controllers/ControlAccesoController.js');

const routerControlAcceso = express.Router();

routerControlAcceso.get('/control-acceso/validar-entrada/:iCardCode', validar_tarjeta_entrada);
routerControlAcceso.get('/control-acceso/validar-salida/:iCardCode', validar_tarjeta_salida);
routerControlAcceso.get('/control-acceso/:tipo_acceso/:cedula/:tipo_id',verify, entrar_salir);
routerControlAcceso.get('/control-acceso/estadisticas_ingreso_hora', verify,estadisticas_ingreso_hora);
routerControlAcceso.get('/personas_edificio', verify,personas_edificio);
routerControlAcceso.get('/ingresaron_salieron_hoy/:tipo_acceso',verify, ingresaron_salieron_hoy);

routerControlAcceso.post('/historial',verify, historial);
module.exports = routerControlAcceso;

