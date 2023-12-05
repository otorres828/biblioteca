const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');
const Abscripcion = require('./Abscripcion.js');
const Carrera = require('./Carrera.js');
const Tarjeta = require('./Tarjeta.js');
const Tipo = require('./Tipo.js');

const Historial = sequelize.define('Historial', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estatus: {
    type: DataTypes.ENUM('1', '2','3'), //1: PASO 2:NO PASO 3: Rechazado
    defaultValue: '1'
  },
  tipo: {
    type: DataTypes.ENUM('1', '2'), //1: ENTRADA 2:SALIDA
    defaultValue: '1'
  },
  tarjeta_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Tarjeta,
      key: 'iCardCode'
    }
  },
  tipo_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Tipo,
      key: 'id'
    }
  },
  carrera_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Carrera,
      key: 'id'
    }
  },
  abscripcion_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Abscripcion,
      key: 'id'
    }
  },

}, {
  timestamps: false,
  tableName: 'historiales'
});

Historial.belongsTo(Tarjeta, {
  foreignKey: 'tarjeta_id'
});

Historial.belongsTo(Tipo, {
  foreignKey: 'tipo_id'
});

Historial.belongsTo(Carrera, {
  foreignKey: 'carrera_id'
});

Historial.belongsTo(Abscripcion, {
  foreignKey: 'abscripcion_id'
});

module.exports = Historial;