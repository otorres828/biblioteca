// seeds/permiso_administradoreplyjs

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permiso_administradores', [{
      id: 1,
      permiso_id: 1,
      administrador_id: 1,
    }, {
      id: 2,
      permiso_id: 4,
      administrador_id: 1,
    }, {
      id: 3,
      permiso_id: 7,
      administrador_id: 1,
    }, {
      id: 4,
      permiso_id: 3,
      administrador_id: 1,
    }, {
      id: 5,
      permiso_id: 2,
      administrador_id: 1,
    }, {
      id: 6,
      permiso_id: 6,
      administrador_id: 1,
    }, {
      id: 7,
      permiso_id: 5,
      administrador_id: 1,
    }, {
      id: 8,
      permiso_id: 1,
      administrador_id: 2,
    }, {
      id: 9,
      permiso_id: 6,
      administrador_id: 2,
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permiso_administradores', null, {});
  },
};
