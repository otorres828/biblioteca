const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');
const Permiso = require('../models/Permiso.js');
const PermisoAdministrador = require('../models/PermisoAdministrador.js');

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
  estatus: {
    type: DataTypes.ENUM('1', '0'),
    defaultValue: '1'
  },
  principal: {
    type: DataTypes.ENUM('1', '0'),
    defaultValue: '2'
  }
},{
  timestamps: false,
  tableName: 'administradores'
})

Administrador.belongsToMany(Permiso, {
  through: PermisoAdministrador,
  foreignKey: 'administrador_id',
  otherKey: 'permiso_id',
  as: 'permisos'
});

module.exports = Administrador;
