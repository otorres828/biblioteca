// seeds/usuarios.js

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('usuarios', [{
      cedula: 123,
      nombres: 'euclides',
      apellidos: 'matacho',
      detalles: 'relevante',
      correo: 'caltaoca@gmail.com',
      telefono: '041477757',
      estatus: 1,
      avatar: null,
    }, {
      cedula: 19111127,
      nombres: 'Camila Andrea',
      apellidos: 'Marchan Mendez',
      detalles: 'estudiante problematico',
      correo: 'camila@est.ucab.edu.ve',
      telefono: '04148899037',
      estatus: 1,
      avatar: '1.jpg',
    }, {
      cedula: 25859600,
      nombres: 'OLIVER',
      apellidos: 'TORRES',
      detalles: '',
      correo: 'oatorres.19@est.ucab.edu.ve',
      telefono: '04148848537',
      estatus: 1,
      avatar: null,
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  },
};
