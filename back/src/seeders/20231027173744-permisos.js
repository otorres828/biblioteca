// seeds/permisos.js

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permisos', [{
      id: 1,
      nombre: 'control-de-acceso',
    }, {
      id: 2,
      nombre: 'estadisticas',
    }, {
      id: 3,
      nombre: 'historial',
    }, {
      id: 4,
      nombre: 'usuarios',
    }, {
      id: 5,
      nombre: 'visitantes',
    }, {
      id: 6,
      nombre: 'acceso-manual',
    }, {
      id: 7,
      nombre: 'administrador',
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permisos', null, {});
  },
};
