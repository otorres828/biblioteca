// config.js
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname,'.env')
});

var development = {
  username: "root",
  password: "",
  database: "biblioteca",
  host:     "localhost",
  dialect:  "mysql",
  timezone: "America/Caracas" // aquí se configura la zona horaria
};

module.exports = development;
