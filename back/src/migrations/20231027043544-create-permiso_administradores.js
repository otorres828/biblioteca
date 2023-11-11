const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear la tabla `permiso_administrador`
    await queryInterface.createTable('permiso_administradores', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      permiso_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'permisos',
          key: 'id'
        }
      },
      administrador_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'administradores',
          key: 'id'
        }
      }
    }, {
      primaryKey: ['id']
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar la tabla `permiso_administrador`
    await queryInterface.dropTable('permiso_administradores');
  }
};
