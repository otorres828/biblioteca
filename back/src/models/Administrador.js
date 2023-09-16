const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

const Administrador = sequelize.define('Administrador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_completo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nick: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
  timestamps: false,
  tableName: 'administradores'
})

module.exports = Administrador;
