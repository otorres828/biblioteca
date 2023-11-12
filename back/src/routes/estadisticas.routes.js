
const {
    ingresos_usuarios_agregar,
    ingresos_usuarios_desagregar
} = require('../controllers/EstadisticasController.js');
const verify = require('../middleware/verify.js');

module.exports = async function (fastify, options) {
    fastify.post('/estadisticas/usuarios/agregar',{preHandler:[verify]}, ingresos_usuarios_agregar);
    fastify.post('/estadisticas/usuarios/desagregar',{preHandler:[verify]}, ingresos_usuarios_desagregar);
}
