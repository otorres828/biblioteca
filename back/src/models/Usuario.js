const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');


const Usuario = sequelize.define('Usuario', {
  cedula: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.BLOB
  },
  estatus: {
    type: DataTypes.ENUM('1', '0'),
    defaultValue: '1'
  },

},{
    timestamps: false,
    tableName: 'usuarios'
 
})
module.exports = Usuario;
