const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database.js');

const Tipo = sequelize.define('Tipo', {
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
  tableName: 'tipos'
})

module.exports = Tipo;
