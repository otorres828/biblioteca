const express = require('express');
const verify = require('../middleware/verify.js');
const { cambiar_aspecto, primer_aspecto } = require('../controllers/ConfiguracionController.js');

const routerConfiguracion = express.Router();

routerConfiguracion.get('/configuracion/primer_aspecto',verify, primer_aspecto);
routerConfiguracion.put('/configuracion/cambiar_aspecto',verify, cambiar_aspecto);

module.exports = routerConfiguracion;
