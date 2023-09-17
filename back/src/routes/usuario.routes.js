const express = require('express');
const { todos_usuarios,
        usuarios,
        visitantes,
        visitante_crear,
        visitante_actualizar,
        historial_usuario_particular,
        cambiar_estado } = require('../controllers/UsuarioController.js');
const verify = require('../middleware/verify.js');

const routeUsuario = express.Router();

routeUsuario.get('/todos_usuarios', verify,todos_usuarios); //Acceso Manual
routeUsuario.get('/usuarios', verify,usuarios);
routeUsuario.post('/historial_usuario_particular', verify,historial_usuario_particular);
routeUsuario.get('/usuarios/cambiar_estado/:cedula',verify, cambiar_estado);

//visitantes
routeUsuario.get('/visitantes', verify,visitantes);
routeUsuario.post('/visitantes/crear',verify, visitante_crear);
routeUsuario.post('/visitantes/actualizar', verify,visitante_actualizar);

module.exports = routeUsuario;
