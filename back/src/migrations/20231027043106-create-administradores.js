const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear la tabla `administradores`
    await queryInterface.createTable('administradores', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre_completo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nick: {
        type: Sequelize.STRING,
        allowNull: false
      },
      clave: {
        type: Sequelize.STRING,
        allowNull: false
      },
      estatus: {
        type: Sequelize.ENUM('1', '0'),
        defaultValue: '1'
      },
      principal: {
        type: Sequelize.ENUM('1', '0'),
        defaultValue: '2'
      }
    });

    // Crear la tabla `permiso_administrador`
    await queryInterface.createTable('permiso_administrador', {
      administrador_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'administradores',
          key: 'id'
        }
      },
      permiso_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'permisos',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar la tabla `permiso_administrador`
    await queryInterface.dropTable('permiso_administrador');

    // Eliminar la tabla `administradores`
    await queryInterface.dropTable('administradores');
  }
};
