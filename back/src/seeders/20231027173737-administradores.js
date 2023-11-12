// seeds/administradoreplyjs

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('administradores', [{
      id: 1,
      nombre_completo: 'Oliver Torres',
      nick: 'otorres828',
      clave: '$2b$10$3HrOlNp0kC86UO/OWu4u6O1yvkMLfpwgFiZzK4.7jy0SpE3wXb7rq',
      estatus: 1,
      principal: 1,
    }, {
      id: 2,
      nombre_completo: 'jesus',
      nick: 'jesusl',
      clave: '$2b$10$cZj7QMyb/aH/bWvZ0y3Ve.KvI8qvAkz9/IoBJbI89r2bNeqHPJUM6',
      estatus: 1,
      principal: 2,
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('administradores', null, {});
  },
};
