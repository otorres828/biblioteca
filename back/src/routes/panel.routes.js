const express = require('express');
const verify = require('../middleware/verify.js');
const {
    obtener_estadisticas_entrada,
    ingresos_grafico,
    ingresos_por_tipo_general,
    ingresos_por_tipo_detallado,
    ingresos_por_carrera_general,
    ingresos_por_carrera_detallado,
    ingresos_personalizado
} = require('../controllers/PanelController.js');

const routerPanel = express.Router();

routerPanel.post('/panel/obtener_estadisticas_entrada',verify, obtener_estadisticas_entrada);
routerPanel.post('/panel/ingresos_grafico',verify, ingresos_grafico);
routerPanel.post('/panel/ingresos_por_tipo_general', verify,ingresos_por_tipo_general);
routerPanel.post('/panel/ingresos_por_tipo_detallado',verify, ingresos_por_tipo_detallado);
routerPanel.post('/panel/ingresos_por_carrera_general',verify, ingresos_por_carrera_general);
routerPanel.post('/panel/ingresos_por_carrera_detallado', verify,ingresos_por_carrera_detallado);
routerPanel.post('/panel/ingresos_personalizado',verify, ingresos_personalizado);

module.exports = routerPanel;
