const express = require('express');
const {
    login,
    permisos,
    permisos_administrador,
    crear_administrador
} = require('../controllers/AutenticacionController.js');

const routerAutenticacion = express.Router();

routerAutenticacion.post('/login', login);
routerAutenticacion.get('/permisos', permisos);
routerAutenticacion.get('/permisos_administrador', permisos_administrador);
routerAutenticacion.post('/crear_administrador', crear_administrador);

module.exports = routerAutenticacion;
