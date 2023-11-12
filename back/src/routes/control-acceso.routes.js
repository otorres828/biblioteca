
const { validar_tarjeta_entrada,
    validar_tarjeta_salida,
    historial,
    entrar_salir ,
    personas_edificio,
    ingresaron_salieron_hoy, 
    estadisticas_ingreso_hora,
} = require('../controllers/ControlAccesoController.js');

module.exports = async function (fastify, options) {
    const verify = require('../middleware/verify.js');

    fastify.get('/control-acceso/validar-entrada/:iCardCode', async (req, reply) => {
        const io = fastify.io; 
        await validar_tarjeta_entrada(req, reply, io); 
      }); 
    fastify.get('/control-acceso/validar-salida/:iCardCode', async (req, reply) => {
        const io = fastify.io; 
        await validar_tarjeta_salida(req, reply, io);
    });       
    fastify.get('/control-acceso/:tipo_acceso/:cedula/:tipo_id',{preHandler:[verify]}, entrar_salir);
    fastify.get('/control-acceso/estadisticas_ingreso_hora', {preHandler:[verify]},estadisticas_ingreso_hora);
    fastify.get('/personas_edificio', {preHandler:[verify]},personas_edificio);
    fastify.get('/ingresaron_salieron_hoy/:tipo_acceso',{preHandler:[verify]}, ingresaron_salieron_hoy);

    fastify.post('/historial',{preHandler:[verify]}, historial);
}
