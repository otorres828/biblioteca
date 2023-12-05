
const verify = require('../middleware/verify.js');
const { carga_masiva } = require('../controllers/CargaMasivaController.js');

module.exports = async function (fastify, options) {
    fastify.post('/carga-masiva', carga_masiva);
}
          


