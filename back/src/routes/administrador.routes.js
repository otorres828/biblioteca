
const verify = require('../middleware/verify.js');
const { permisos, 
    permisos_administrador,
    crear_administrador,
    todos_administradores,
    cambiar_estado,
    crear,
    mis_permisos } = require('../controllers/AdministradorController.js');

module.exports = async function (fastify, options) {
    fastify.get('/permisos', permisos);
    fastify.get('/permisos_administrador', permisos_administrador);
    fastify.post('/crear_administrador', crear_administrador);
    fastify.get('/administradores/todos_administradores', todos_administradores);
    fastify.get('/administradores/cambiar_estado/:administrador_id',{preHandler:[verify]}, cambiar_estado);
    fastify.get('/administradores/mis_permisos',{preHandler:[verify]}, mis_permisos);
    fastify.post('/administradores/:tipo',{preHandler:[verify]}, crear);
}
          


