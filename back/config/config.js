// config.js
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname,'.env')
});

var development = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host:     process.env.DB_HOST,
  dialect:  process.env.DB_DIALECT,
  timezone: process.env.DB_TIMEZONE // aquí se configura la zona horaria
};

module.exports = development;
