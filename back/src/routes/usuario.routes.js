
const { todos_usuarios,
        usuarios,
        visitantes,
        visitante_crear,
        visitante_actualizar,
        historial_usuario_particular,
        cambiar_estado,
        actualizar_informacion } = require('../controllers/UsuarioController.js');
const verify = require('../middleware/verify.js');

module.exports = async function (fastify, options) {

    fastify.get('/todos_usuarios',{preHandler:[verify]},todos_usuarios); //Acceso Manual
    fastify.get('/usuarios',{preHandler:[verify]},usuarios);
    fastify.post('/usuarios/historial_usuario_particular',{preHandler:[verify]},historial_usuario_particular);
    fastify.get('/usuarios/cambiar_estado/:cedula', {preHandler:[verify]},cambiar_estado);
    fastify.post('/usuarios/actualizar/informacion',{preHandler:[verify]}, actualizar_informacion);

    //visitantes
    fastify.get('/visitantes',visitantes);
    fastify.post('/visitantes/crear', visitante_crear);
    fastify.post('/visitantes/actualizar',visitante_actualizar);

}