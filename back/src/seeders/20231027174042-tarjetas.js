// seeds/tarjetas.js

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tarjetas', [{
        iCardCode: 10900,
        iSiteCode: 573,
        estatus: 1,
        cedula: 25859600,
        tipo_id: 5,
        carrera_id: null,
        abscripcion_id: null,
      },
      {
        iCardCode: 26954,
        iSiteCode: 741,
        estatus: 1,
        cedula: 26269828,
        tipo_id: 3,
        carrera_id: 5,
        abscripcion_id: 8,
      },
      {
        iCardCode: 39427,
        iSiteCode: 864,
        estatus: 1,
        cedula: 19111127,
        tipo_id: 2,
        carrera_id: 6,
        abscripcion_id: 1,
      },
      {
        iCardCode: 48722,
        iSiteCode: 612,
        estatus: 1,
        cedula: 123,
        tipo_id: 5,
        carrera_id: null,
        abscripcion_id: null,
      
    }]);
  
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tarjetas', null, {});
  },
};

