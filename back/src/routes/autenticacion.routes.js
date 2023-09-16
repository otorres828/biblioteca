const express = require('express');
const {
    login
} = require('../controllers/AutenticacionController.js');

const routerAutenticacion = express.Router();

routerAutenticacion.post('/login', login);

module.exports = routerAutenticacion;
