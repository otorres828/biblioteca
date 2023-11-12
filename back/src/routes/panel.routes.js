
const {
    obtener_estadisticas_entrada,
    ingresos_grafico,
    ingresos_por_tipo_general,
    ingresos_por_tipo_detallado,
    ingresos_por_carrera_general,
    ingresos_por_carrera_detallado,
    ingresos_personalizado
} = require('../controllers/PanelController.js');
const verify = require('../middleware/verify.js');

module.exports = async function (fastify, options) {
    fastify.post('/panel/obtener_estadisticas_entrada', {preHandler:[verify]}, obtener_estadisticas_entrada);
    fastify.post('/panel/ingresos_grafico',{preHandler:[verify]}, ingresos_grafico);
    fastify.post('/panel/ingresos_por_tipo_general', {preHandler:[verify]},ingresos_por_tipo_general);
    fastify.post('/panel/ingresos_por_tipo_detallado',{preHandler:[verify]}, ingresos_por_tipo_detallado);
    fastify.post('/panel/ingresos_por_carrera_general',{preHandler:[verify]}, ingresos_por_carrera_general);
    fastify.post('/panel/ingresos_por_carrera_detallado', {preHandler:[verify]},ingresos_por_carrera_detallado);
    fastify.post('/panel/ingresos_personalizado',{preHandler:[verify]}, ingresos_personalizado);
}