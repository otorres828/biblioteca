const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

const Abscripcion = sequelize.define('Abscripcion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
  timestamps: false,
  tableName: 'abscripciones'
})

module.exports = Abscripcion;
