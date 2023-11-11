// seeds/abscripciones.js

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('abscripciones', [{
      id: 1,
      nombre: 'Dean',
    }, {
      id: 2,
      nombre: 'Zackery',
    }, {
      id: 3,
      nombre: 'Tatum',
    }, {
      id: 4,
      nombre: 'Isac',
    }, {
      id: 5,
      nombre: 'Lonnie',
    }, {
      id: 6,
      nombre: 'Braden',
    }, {
      id: 7,
      nombre: 'Maida',
    }, {
      id: 8,
      nombre: 'Romaine',
    }, {
      id: 9,
      nombre: 'Ellis',
    }, {
      id: 10,
      nombre: 'Chase',
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('abscripciones', null, {});
  },
};
