const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

const Permiso = sequelize.define('Permiso', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
  timestamps: false,
  tableName: 'permisos'
})

module.exports = Permiso;
