const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');
const Permiso = require('./Permiso.js');
const Administrador = require('./Administrador.js');

const PermisoAdministrador = sequelize.define('PermisoAdministrador', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  permiso_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Permiso,
      key: 'id'
    }
  },
  administrador_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Administrador,
      key: 'id'
    }
  },
},{
  timestamps: false,
  tableName: 'permiso_administrador'
})

// PermisoAdministrador.belongsTo(Permiso, {
//   foreignKey: 'permiso_id'
// });

// PermisoAdministrador.belongsTo(Administrador, {
//   foreignKey: 'administrador_id'
// });

module.exports = PermisoAdministrador;
