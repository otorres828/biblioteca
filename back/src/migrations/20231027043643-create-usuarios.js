const { Sequelize } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear la tabla `usuarios`
    await queryInterface.createTable('usuarios', {
      cedula: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nombres: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apellidos: {
        type: Sequelize.STRING,
        allowNull: false
      },
      detalles: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      correo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      telefono: {
        type: Sequelize.STRING,
        allowNull: true
      },
      avatar: {
        type: Sequelize.STRING
      },
      estatus: {
        type: Sequelize.ENUM('1', '0'),
        defaultValue: '1'
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar la tabla `usuarios`
    await queryInterface.dropTable('usuarios');
  }
};
