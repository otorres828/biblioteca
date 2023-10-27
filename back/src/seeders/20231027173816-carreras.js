// seeds/carreras.js

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('carreras', [{
      id: 1,
      nombre: 'ingenieria en informatica',
    }, {
      id: 2,
      nombre: 'ingenieria industrial',
    }, {
      id: 3,
      nombre: 'ingenieria civil',
    }, {
      id: 4,
      nombre: 'derecho',
    }, {
      id: 5,
      nombre: 'comunicacion social',
    }, {
      id: 6,
      nombre: 'administracion de empresas',
    }, {
      id: 7,
      nombre: 'contaduria publica',
    }, {
      id: 8,
      nombre: 'relaciones industriales',
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('carreras', null, {});
  },
};
