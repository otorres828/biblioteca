const express = require('express');
const verify = require('../middleware/verify.js');
const { permisos, 
    permisos_administrador,
    crear_administrador,
    todos_administradores,
    cambiar_estado } = require('../controllers/AdministradorController.js');

const routerAdministrador = express.Router();

routerAdministrador.get('/permisos', permisos);
routerAdministrador.get('/permisos_administrador', permisos_administrador);
routerAdministrador.post('/crear_administrador', crear_administrador);
routerAdministrador.get('/administradores/todos_administradores', todos_administradores);
routerAdministrador.get('/administradores/cambiar_estado/:id', cambiar_estado);

module.exports = routerAdministrador;
