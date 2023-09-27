const express = require("express");
const jwt = require('jsonwebtoken');
const secretKey = 'KGGK>HKHVHJVKBKJKJBKBKHKBMKHB';

const verify = express.Router();

verify.use((req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token || token == undefined) {
    return res.status(401).json({
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
        return res.json({
          message: 'Token no válido'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
});

module.exports = verify;
