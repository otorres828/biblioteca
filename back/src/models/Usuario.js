
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');
const Tarjeta = require('./Tarjeta.js');

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
  detalles: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  avatar: {
    type: DataTypes.STRING
  },
  estatus: {
    type: DataTypes.ENUM('1', '0'),
    defaultValue: '1'
  },
},{
    timestamps: false,
    tableName: 'usuarios'
});

Usuario.hasMany(Tarjeta,{
    foreignKey: 'cedula'
});

Tarjeta.belongsTo(Usuario, {
  foreignKey: 'cedula'
});

module.exports = Usuario;
