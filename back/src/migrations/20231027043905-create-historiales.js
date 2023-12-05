const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear la tabla `historiales`
    await queryInterface.createTable('historiales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      estatus: {
        type: Sequelize.ENUM('1', '2','3'), //1: PASO 2:NO PASO 3: Rechazado
        defaultValue: '1'
      },
      tipo: {
        type: Sequelize.ENUM('1', '2'), //1: ENTRADA 2:SALIDA
        defaultValue: '1'
      },
      tarjeta_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tarjetas',
          key: 'iCardCode'
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
    // Eliminar la tabla `historiales`
    await queryInterface.dropTable('historiales');
  }
};
