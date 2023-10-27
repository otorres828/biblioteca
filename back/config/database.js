const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'biblioteca',
  "root",
  null,
  {
    dialect: 'sqlite',
    host: './config/biblioteca.sqlite',
  }
);

module.exports = sequelize;
