const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'biblioteca',
  null,
  null,
  {
    dialect: 'sqlite',
    host: './config/biblioteca.sqlite',
  }
);

module.exports = sequelize;
