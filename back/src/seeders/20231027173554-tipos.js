// seeds/20230720123456-tipos.js

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tipos', [{
      id: 1,
      nombre: 'estudiante',
    }, {
      id: 2,
      nombre: 'profesor',
    }, {
      id: 3,
      nombre: 'administrativo',
    }, {
      id: 4,
      nombre: 'empleado',
    }, {
      id: 5,
      nombre: 'visitante',
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tipos', null, {});
  },
};
