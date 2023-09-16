const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

const Configuracion = sequelize.define('Configuracion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estatus: {
    type: DataTypes.ENUM('1', '0'),
    defaultValue: '1'
  },
},{
  timestamps: false,
  tableName: 'configuraciones'
})

module.exports = Configuracion;
