const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear la tabla `tarjetas`
    await queryInterface.createTable('tarjetas', {
      iCardCode: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      iSiteCode: {
        type: Sequelize.INTEGER,
      },
      estatus: {
        type: Sequelize.ENUM('1', '0'),
        defaultValue: '1'
      },
      cedula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'cedula'
        }
      },
      tipo_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tipos',
          key: 'id'
        }
      },
      carrera_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'carreras',
          key: 'id'
        }
      },
      abscripcion_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'abscripciones',
          key: 'id'
        }
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar la tabla `tarjetas`
    await queryInterface.dropTable('tarjetas');
  }
};
