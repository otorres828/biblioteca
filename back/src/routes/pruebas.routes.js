const express = require('express');
const {
    que_hora_es
} = require('../controllers/PruebasController.js');

const routerPrueba = express.Router();

routerPrueba.get('/que_hora_es', que_hora_es);

module.exports = routerPrueba;
