const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

const Carrera = sequelize.define('Carrera', {
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
  tableName: 'carreras'
})

module.exports = Carrera;
