const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');
const Abscripcion = require('./Abscripcion.js');
const Carrera = require('./Carrera.js');
const Tipo = require('./Tipo.js');
const Usuario = require('./Usuario.js');

const Tarjeta = sequelize.define('Tarjeta', {
  iCardCode: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  iSiteCode: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  estatus: {
    type: DataTypes.ENUM('1', '0'),
    defaultValue: '1'
  },
  cedula: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'cedula'
    }
  },
  tipo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tipo,
      key: 'id'
    }
  },
  carrera_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Carrera,
      key: 'id'
    }
  },
  abscripcion_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Abscripcion,
      key: 'id'
    }
  },
},{
  timestamps: false,
  tableName: 'tarjetas'
})



Tarjeta.belongsTo(Carrera, {
  foreignKey: 'carrera_id'
});

Tarjeta.belongsTo(Tipo, {
  foreignKey: 'tipo_id'
});

Tarjeta.belongsTo(Abscripcion, {
  foreignKey: 'abscripcion_id'
});
module.exports = Tarjeta;