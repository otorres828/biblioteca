const jwt = require('jsonwebtoken');
const secretKey = 'KGGK>HKHVHJVKBKJKJBKBKHKBMKHB';

const verify = async (request, reply) => {
  let token = request.headers['x-access-token'] || request.headers['authorization'];
  if (!token || token == undefined) {
    return reply.code(401).send({
      error: "Es necesario el token para acceder a la aplicación"
    });
  } else {
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
  }
  if (token) {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reply.code(401).send({
          message: 'Token no válido'
        });
      } else {
        request.decoded = decoded;
        return;
      }
    });
  }
};

module.exports = verify;
