const Historial = require("../models/Historial.js");
const Usuario = require("../models/Usuario.js");
const Tipo = require("../models/Tipo.js");
const Carrera = require("../models/Carrera.js");
const { Op } = require('sequelize');
const Tarjeta = require("../models/Tarjeta.js");

// Funcion para obtener las estadisticas del historial de acceso
const obtener_estadisticas_entrada = async (req, reply) => {
  try {
    //obtener datos
    const fecha_inicio = req.body.fecha_inicio;
    const fecha_fin = req.body.fecha_fin;
    const tipoAcceso = req.body.tipo_acceso;

    // obtiene el numero de usuarios
    const totalUsuarios = await Usuario.count();

    // Obtenga el número total de usuarios registrados en el historial en el rango de fecha
    const totalUsuariosRegistradosHoy = await Historial.count({
      where: {
        fecha: {
          [Op.between]: [fecha_inicio, fecha_fin],
        },
        tipo: tipoAcceso !== "0" ? tipoAcceso : { [Op.ne]: 0 },
      },
    });
    
    // Obtener el número total de usuarios de tipo 1: estudiantes
    const tt = await Tarjeta.count({
      where: {
        tipo_id: 1,
        cedula:{ [Op.ne]: 0}
      },
      group: ['cedula']
    });
    
    const totalUsuariosTipo1 = tt.length;


    // Obtenga el número total de usuarios de tipo 1:estudiantes registrados en el historial en el rango de fecha   
    const totalUsuariosTipo1RegistradosHoy = await Historial.count({
      where: {
        fecha: {
          [Op.between]: [fecha_inicio, fecha_fin],
        },
        tipo_id: 1,
        tipo: tipoAcceso !== "0" ? tipoAcceso : { [Op.ne]: 0 },
      },
      include: [
        {
          model: Tarjeta,
          required: true,
          include:[
            {      
            model: Usuario,
            required: true,
            },
            {      
              model: Tipo,
              required: true,
            }
          ]
        }
      ],
    });
    

    // Obtenga el número total de pases válidos en el historial (estado = 1)    
    const totalPasesValidos = await Historial.count({
      where: {
        estatus: '1',
        tipo: 1,
        tipo: tipoAcceso !== "0" ? tipoAcceso : { [Op.ne]: 0 },
      },
    });

    // Obtenga el número total de pases válidos en el día rango de fecha    
    const totalPasesValidosHoy = await Historial.count({
      where: {
        fecha: {
          [Op.between]: [fecha_inicio, fecha_fin],
        },
        estatus: '1',
        tipo: tipoAcceso !== "0" ? tipoAcceso : { [Op.ne]: 0 },        
      },
    });

    // Obtenga el número total de pases no válidos en el historial (estados distintos de 1)
    const totalPasesInvalidos = await Historial.count({
      where: {
        estatus: {
          [Op.not]: '1',
        },
        tipo: tipoAcceso !== "0" ? tipoAcceso : { [Op.ne]: 0 },
      },
    });

    // Obtenga el número total de pases no válidos en el día rango de fecha
    const totalPasesInvalidosHoy = await Historial.count({
      where: {
        fecha: {
          [Op.between]: [fecha_inicio, fecha_fin],
        },
        estatus: {
          [Op.not]: '1',
        },
        tipo: tipoAcceso !== "0" ? tipoAcceso : { [Op.ne]: 0 },
      },
    });

    // crea un objeto con los resultados
    const estadisticas = {
      totalUsuarios,
      totalUsuariosRegistradosHoy,
      totalUsuariosTipo1,
      totalUsuariosTipo1RegistradosHoy,
      totalPasesValidos,
      totalPasesValidosHoy,
      totalPasesInvalidos,
      totalPasesInvalidosHoy,
    };

    // envia la respuesta de las estadisticas
    reply.code(200).send(estadisticas);
  } catch (error) {
    console.error(error);
    reply.code(200).send({ message: 'Error al obtener las estadisticas' });
  }
};

// Obtiene las estadisticas de ingresos al edificio en un rango de fecha para la grafica
const ingresos_grafico = async (req, reply) => {
  try {
    const dias = [];
    const ingresosCounts = [];

    //obtener datos
    const fechaInicio = new Date(req.body.fechaInicio);
    const fechaFin = new Date(req.body.fechaFin);
    const diffTime = Math.abs(fechaFin - fechaInicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    for (let day = 0; day < diffDays; day++) {
      const startDate = new Date(fechaInicio);
      startDate.setDate(startDate.getDate() + day);

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

    
      const ingresosCount = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          }
        }
      });

      const dia = startDate.getDate();
      const mes = startDate.getMonth() + 1; // Los meses en JavaScript empiezan en 0
      dias.push(`${dia}-${mes}`);
      ingresosCounts.push(ingresosCount);
    }

    const result = {
      dias,
      ingresosCounts
    };

    reply.send(result);
  } catch (error) {
    console.error(error);
    reply.code(500).send({
      error: 'Internal server error'
    });
  }
};

// Obtiene las estadisticas de ingreso por tipo de usuario en un rango de fecha de manera general
const ingresos_por_tipo_general = async (req, reply) => {
  try {
    const tipos = [];
    const ingresosCounts = [];

    //obtener datos
    const fechaInicio = new Date(req.body.fechaInicio);
    const fechaFin = new Date(req.body.fechaFin);

    // obtener todos los tipos
    const allTipos = await Tipo.findAll();

    for (let tipo of allTipos) {
      const ingresosCount = await Historial.count({
        include: [{
          model: Tarjeta,
          include: [{
            model: Usuario,
          }]
        }],
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [fechaInicio, fechaFin]
          },
          tipo_id: tipo.id,
        }
      });

      tipos.push(tipo.nombre);
      ingresosCounts.push(ingresosCount);
    }

    const result = {
      tipos,
      ingresosCounts
    };

    reply.send(result);
  } catch (error) {
    console.error(error);
    reply.code(500).send({
      error: 'Internal server error'
    });
  }
};

// Obtiene las estadisticas de ingreso por tipo de usuario en un rango de fecha de manera detallada
const ingresos_por_tipo_detallado = async (req, reply) => {
  try {
    const dias = [];
    const ingresosEstudiantes = [];
    const ingresosProfesores = [];
    const ingresosAdministrativos = [];
    const ingresosEmpleados = [];
    const ingresosVisitantes = [];

    //obtener datos
    const fechaInicio = new Date(req.body.fechaInicio);
    const fechaFin = new Date(req.body.fechaFin);
    const diffTime = Math.abs(fechaFin - fechaInicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    for (let day = 0; day < diffDays; day++) {
      const startDate = new Date(fechaInicio);
      startDate.setDate(startDate.getDate() + day);

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      //estudiantes
      const ingresosCountEstudiantes = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          tipo_id: 1,
        },
        include: {
          model: Tarjeta,
          required: true,
          include: {
            model: Usuario,
            required: true,
          },
        },

      });

      //profesores
      const ingresosCountProfesores = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          tipo_id: 2,
        },
        include: {
          model: Tarjeta,
          required: true,
          include: {
            model: Usuario,
            required: true,
          },
        },

      });

      //administrativos
      const ingresosCountAdministrativos = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          tipo_id: 3,
        },
        include: {
          model: Tarjeta,
          required: true,
          include: {
            model: Usuario,
            required: true,
          },
        },

      });

      //empleados
      const ingresosCountEmpleados = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          tipo_id: 4,
        },
        include: {
          model: Tarjeta,
          required: true,
          include: {
            model: Usuario,
            required: true,
          },
        },

      });

      //visitantes
      const ingresosCountVisitantes = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          tipo_id: 5,
        },
        include: {
          model: Tarjeta,
          required: true,
          include: {
            model: Usuario,
            required: true,
          },
        },

      });

      const dia = startDate.getDate();
      const mes = startDate.getMonth() + 1; // Los meses en JavaScript empiezan en 0
      dias.push(`${dia}-${mes}`);
      ingresosEstudiantes.push(ingresosCountEstudiantes);
      ingresosProfesores.push(ingresosCountProfesores);
      ingresosAdministrativos.push(ingresosCountAdministrativos);
      ingresosEmpleados.push(ingresosCountEmpleados);
      ingresosVisitantes.push(ingresosCountVisitantes);
    }

    const result = {
      dias,
      ingresosEstudiantes,
      ingresosProfesores,
      ingresosAdministrativos,
      ingresosEmpleados,
      ingresosVisitantes,
    };

    reply.send(result);
  } catch (error) {
    console.error(error);
    reply.code(500).send({
      error: 'Internal server error'
    });
  }
   
};

// Obtiene las estadisticas de ingreso por carrera en un rango de fecha de manera general
const ingresos_por_carrera_general = async (req, reply) => {
  try {
    const carreras = [];
    const ingresosCounts = [];

    // obtener datos
    const fechaInicio = new Date(req.body.fechaInicio);
    const fechaFin = new Date(req.body.fechaFin);

    // obtener todos los tipos
    const allCarreras = await Carrera.findAll();

    for (let carrera of allCarreras) {
      const ingresosCount = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [fechaInicio, fechaFin]
          },
          carrera_id: carrera.id,
        },
        include: [
          {
            model: Tarjeta,
            include: [
              {
                model: Usuario,
                as: 'Usuario',
              },
              {
                model: Carrera,
                as: 'Carrera'
              }
            ]
          }
        ]
      });
    
      carreras.push(carrera.nombre);
      ingresosCounts.push(ingresosCount);
    }
    
    
    const result = {
      carreras,
      ingresosCounts
    };

    reply.send(result);
  } catch (error) {
    console.error(error);
    reply.code(500).send({
      error: 'Internal server error'
    });
  }
};

// Obtiene las estadisticas de ingreso por tipo de usuario en un rango de fecha de manera detallada
const ingresos_por_carrera_detallado = async (req, reply) => {
  try {
    const dias = [];
    const ingresosInformatica = [];
    const ingresosIndustrial = [];
    const ingresosCivil = [];
    const ingresosDerecho = [];
    const ingresosComunicacion = [];
    const ingresosAdministracionEmpresas = [];
    const ingresosContaduriaPublica = [];
    const ingresosRelacionesIndustriales = [];

    //obtener datos
    const fechaInicio = new Date(req.body.fechaInicio);
    const fechaFin = new Date(req.body.fechaFin);
    const diffTime = Math.abs(fechaFin - fechaInicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    for (let day = 0; day < diffDays; day++) {
      const startDate = new Date(fechaInicio);
      startDate.setDate(startDate.getDate() + day);

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      //informatica
      const ingresosCountInformatica = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          // '$Tarjeta.Usuario.carrera_id$': 1
          carrera_id:1 
        },
        // include: {
        //   model: Tarjeta,
        //   required: true,
        //   include: { // Aquí estás incluyendo Usuario en tu consulta
        //     model: Usuario,
        //     required: true
        //   }
        // },
      });
    
      //industrial
      const ingresosCountIndustrial = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          carrera_id:2
        },
      });

      //civil
      const ingresosCountCivil = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          carrera_id:3
        },
      });

      //derecho
      const ingresosCountDerecho = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          carrera_id:4
        },
      });

      //comunicacion social
      const ingresosCountComunicacion = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          carrera_id:5
        },
      });

      //administracion de empresas
      const ingresosCountAdministracionEmpresas = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          carrera_id:6
        },
      });

      //contaduria publica
      const ingresosCountContaduriaPublica = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          carrera_id:7
        },
      });

      //contaduria publica
      const ingresosCountRelacionesIndustriales = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          carrera_id:8
        },
      });

      const dia = startDate.getDate();
      const mes = startDate.getMonth() + 1; // Los meses en JavaScript empiezan en 0
      dias.push(`${dia}-${mes}`);
      ingresosInformatica.push(ingresosCountInformatica);
      ingresosIndustrial.push(ingresosCountIndustrial);
      ingresosCivil.push(ingresosCountCivil);
      ingresosDerecho.push(ingresosCountDerecho);
      ingresosComunicacion.push(ingresosCountComunicacion);
      ingresosAdministracionEmpresas.push(ingresosCountAdministracionEmpresas);
      ingresosContaduriaPublica.push(ingresosCountContaduriaPublica);
      ingresosRelacionesIndustriales.push(ingresosCountRelacionesIndustriales);
    }

    const result = {
      dias,
      ingresosInformatica,
      ingresosIndustrial,
      ingresosCivil,
      ingresosDerecho,
      ingresosComunicacion,
      ingresosAdministracionEmpresas,
      ingresosContaduriaPublica,
      ingresosRelacionesIndustriales
    };

    reply.send(result);
  } catch (error) {
    console.error(error);
    reply.code(500).send({
      error: 'Internal server error'
    });
  }
   
};

const ingresos_personalizado = async (req, reply) => {
  const { tipo_id, carrera_id } = req.body;
  try {
    const dias = [];
    const ingresos = [];
  
    //obtener datos
    const fechaInicio = new Date(req.body.fechaInicio);
    const fechaFin = new Date(req.body.fechaFin);
    const diffTime = Math.abs(fechaFin - fechaInicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    const carreraCondition = carrera_id == 0 ? {} : { carrera_id: carrera_id };
    const tipoCondition = tipo_id == 0 ? {} : { tipo_id: tipo_id };

    for (let day = 0; day < diffDays; day++) {
      const startDate = new Date(fechaInicio);
      startDate.setDate(startDate.getDate() + day);

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);

      const ingresosCount = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startDate, day===diffDays-1 ?  fechaFin : endDate]
          },
          ...carreraCondition,
          ...tipoCondition
        },
      });

      const dia = startDate.getDate();
      const mes = startDate.getMonth() + 1; // Los meses en JavaScript empiezan en 0
      dias.push(`${dia}-${mes}`);
      ingresos.push(ingresosCount);
    }

    const result = {
      dias,
      ingresos,
    };

    reply.send(result);
  } catch (error) {
    console.error(error);
    reply.code(500).send({
      error: 'Internal server error'
    });
  } 
};

module.exports = { obtener_estadisticas_entrada,
                  ingresos_grafico,
                  ingresos_por_tipo_general,
                  ingresos_por_tipo_detallado,
                  ingresos_por_carrera_general,
                  ingresos_por_carrera_detallado,
                  ingresos_personalizado};
