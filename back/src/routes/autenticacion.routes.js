const { login } = require('../controllers/AutenticacionController.js');

module.exports = async function (fastify, options) {
 fastify.post('/login', login);
}
