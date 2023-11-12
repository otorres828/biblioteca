const Historial = require("../models/Historial.js");
const Usuario = require("../models/Usuario.js");
const Carrera = require("../models/Carrera.js");
const { Op } = require('sequelize');
const Tarjeta = require("../models/Tarjeta.js");
const moment = require("moment");

// Obtiene las estadisticas de ingreso por Usuarios en el rango seleccionado en el select y el intervalo escrito en el input. Ejempl: Semanas / 15
const ingresos_usuarios_agregar = async (req, reply) => {
    try {
        const dias = [];
        const ingresosCounts = [];
    
        // Obtener datos
        const intervalo = req.body.intervalo;
        const tiempo = req.body.tiempo;
        const tipo_id = req.body.tipo_id;
        // Calcular la fecha de inicio y fin basado en el intervalo y tiempo ingresados
        let cantidad=0;
        if(tiempo==1) cantidad=1;
        if(tiempo==2) cantidad=7;
        if(tiempo==3) cantidad=30;
        if(tiempo==4) cantidad=360;
        
        const tiempo_total=cantidad*intervalo; //tiempo total en dias
        //obtenemos la fecha actual y le restamos el tiempo total   
        const hoy = new Date();
        const FechaInicio = new Date(hoy.setDate(hoy.getDate() - tiempo_total+1));
        
        // Obtén la fecha en formato deseado
        let fechaFormateada = FechaInicio.toISOString().split('T')[0];
        
        console.log('aqui antes'+req.body)
        for (let day = 0, dia = 1; day < tiempo_total; day += cantidad, dia++) {
          fechaFormateada =  new Date(fechaFormateada);
          const fechaInicio = fechaFormateada;
          const fechaFin = addDays(fechaInicio, cantidad);
        
          const counts = await Historial.count({
            where: {
              tipo: '1',
              estatus: '1',
              fecha: {
                [Op.between]: [fechaInicio, fechaFin],
              },
              tipo_id: {
                [Op.in]: tipo_id==1 ? [1, 2, 3] : (tipo_id==2 ? [1]: (tipo_id==3 ? [2] : (tipo_id==4 ? [3] : (tipo_id==5 ? [4] : [5])))),
              },
            },
          });
        
          fechaFormateada = addDays(fechaFormateada, cantidad).toISOString().split('T')[0];
        
          // dias.push(`${formatoFecha(fechaInicio)} al ${formatoFecha(fechaFin)}`);
          dias.push(`${formatoFecha(fechaFin)}`);
          ingresosCounts.push(counts);
        }
        console.log('aqui despues'+req.body)

        // Devolver los resultados
        reply.send({ dias, ingresosCounts });
    } catch (error) {
      console.error(error);
      reply.code(500).send({
        error: 'Error interno de servidor'
      });
    }
};

// Desagrega las estadisticas en el select y el intervalo escrito en el input. Ejempl: Semanas / 15
const ingresos_usuarios_desagregar = async (req, reply) => {
  try {
      const dias = [];
      const ingresosCounts = [];
      //tipo_id = 1 USUARIOS
      const estudiantes = [];
      const profesores = [];
      const administrativos = [];
      //tipo_id=2y3 ESTUDIANTES y profesores
      const informatica = [];
      const industrial = [];
      const civil = [];
      const derecho = [];
      const comunicacion = [];
      const administracion = [];
      const contaduria = [];
      const relaciones = [];

      // Obtener datos
      const intervalo = req.body.intervalo;
      const tiempo = req.body.tiempo;
      const tipo_id = req.body.tipo_id;
  
      // Calcular la fecha de inicio y fin basado en el intervalo y tiempo ingresados
      let cantidad=0;
      if(tiempo==1) cantidad=1;
      if(tiempo==2) cantidad=7;
      if(tiempo==3) cantidad=30;
      if(tiempo==4) cantidad=360;

      const tiempo_total=cantidad*intervalo; //tiempo total en dias
      //obtenemos la fecha actual y le restamos el tiempo total   
      const hoy = new Date();
      const FechaInicio = new Date(hoy.setDate(hoy.getDate() - tiempo_total+1));

      // Obtén la fecha en formato deseado
      let fechaFormateada = FechaInicio.toISOString().split('T')[0];


      for (let day = 0, dia = 1; day < tiempo_total; day += cantidad, dia++) {
        fechaFormateada = new Date(fechaFormateada);
        const fechaInicio = fechaFormateada;
        const fechaFin = addDays(fechaInicio, cantidad);
      
        if (tipo_id == 1) { //DESAGREGAMOS USUARIOS EN (ESTUDIANTES-PROFESORES-ADMINISTRATIVOS)

          const tipo1 = await Historial.count({
            where: {
              tipo: '1',
              estatus: '1',
              fecha: {
                [Op.between]: [fechaInicio, fechaFin],
              },
              tipo_id: 1,
            },
          });
          const tipo2 = await Historial.count({
            where: {
              tipo: '1',
              estatus: '1',
              fecha: {
                [Op.between]: [fechaInicio, fechaFin],
              },
              tipo_id: 2,
            },
          });
          const tipo3 = await Historial.count({
            where: {
              tipo: '1',
              estatus: '1',
              fecha: {
                [Op.between]: [fechaInicio, fechaFin],
              },
              tipo_id: 3,
            },
          });
      
          estudiantes.push(tipo1);
          profesores.push(tipo2);
          administrativos.push(tipo3);
        }

        else{ //DESAGRGAMOS LOS ESTUDIANTES O PROFESORES POR CARRERA

          const tipo1 = await Historial.count({
            where: {
              tipo: '1',
              estatus: '1',
              fecha: {
                [Op.between]: [fechaInicio, fechaFin],
              },
              tipo_id: tipo_id== 2 ? 1 : 2,
              carrera_id:1
            },
          });
          const tipo2 = await Historial.count({
            where: {
              tipo: '1',
              estatus: '1',
              fecha: {
                [Op.between]: [fechaInicio, fechaFin],
              },
              tipo_id: tipo_id== 2 ? 1 : 2,
              carrera_id:2
            },
          });
          const tipo3 = await Historial.count({
            where: {
              tipo: '1',
              estatus: '1',
              fecha: {
                [Op.between]: [fechaInicio, fechaFin],
              },
              tipo_id: tipo_id== 2 ? 1 : 2,
              carrera_id:3
            },
          });
          const tipo4 = await Historial.count({
            where: {
              tipo: '1',
              estatus: '1',
              fecha: {
                [Op.between]: [fechaInicio, fechaFin],
              },
              tipo_id: tipo_id== 2 ? 1 : 2,
              carrera_id:4
            },
          });
          const tipo5 = await Historial.count({
            where: {
              tipo: '1',
              estatus: '1',
              fecha: {
                [Op.between]: [fechaInicio, fechaFin],
              },
              tipo_id: tipo_id== 2 ? 1 : 2,
              carrera_id:5
          },
          });
          const tipo6 = await Historial.count({
            where: {
              tipo: '1',
              estatus: '1',
              fecha: {
                [Op.between]: [fechaInicio, fechaFin],
              },
              tipo_id: tipo_id== 2 ? 1 : 2,
              carrera_id:6           
          },
          });
          const tipo7 = await Historial.count({
            where: {
              tipo: '1',
              estatus: '1',
              fecha: {
                [Op.between]: [fechaInicio, fechaFin],
              },
              tipo_id: tipo_id== 2 ? 1 : 2,
              carrera_id:7
            },
          });
          const tipo8 = await Historial.count({
            where: {
              tipo: '1',
              estatus: '1',
              fecha: {
                [Op.between]: [fechaInicio, fechaFin],
              },
              tipo_id: tipo_id== 2 ? 1 : 2,
              carrera_id:8
            },
          });
      
          informatica.push(tipo1);
          industrial.push(tipo2);
          civil.push(tipo3);
          derecho.push(tipo4);
          comunicacion.push(tipo5);
          administracion.push(tipo6);
          contaduria.push(tipo7);
          relaciones.push(tipo8);
        }
        
        fechaFormateada = addDays(fechaFormateada, cantidad).toISOString().split('T')[0];
        
        // dias.push(`${formatoFecha(fechaInicio)} al ${formatoFecha(fechaFin)}`);
        dias.push(`${formatoFecha(fechaFin)}`);

      }

      if (tipo_id == 1) {
        ingresosCounts.push(
          {
            name: 'Estudiantes',
            data: estudiantes,
          },
          {
            name: 'Profesores',
            data: profesores,
          },
          {
            name: 'Administrativos',
            data: administrativos,
          }
        );
      }
      else {
        ingresosCounts.push(
          {
            name: 'Ingenieria en Informatica',
            data: informatica,
          },
          {
            name: 'Ingenieria Industrial',
            data: industrial,
          },
          {
            name: 'Ingenieria Civil',
            data: civil,
          },
          {
            name: 'Derecho',
            data: derecho,
          },
          {
            name: 'Comunicacion Social',
            data: comunicacion,
          },
          {
            name: 'Administracion de Empresas',
            data: administracion,
          },
          {
            name: 'Contaduria Publica',
            data: contaduria,
          },
          {
            name: 'Relaciones Industriales',
            data: relaciones,
          }
        );
      }
            
  
      // Devolver los resultados
      reply.send({ dias, ingresosCounts });
  } catch (error) {
    console.error(error);
    reply.code(500).send({
      error: 'Internal server error'
    });
  }
};

function addDays(date, days) {
    const copy = new Date(Number(date));
    copy.setDate(date.getDate() + days);
    return copy;
}

function formatoFecha(fecha) {
  const fechaObj = new Date(fecha);
  const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const fechaFormateada = fechaObj.toLocaleDateString('es-ES', opciones).replace('/', '-').replace('/', '-');
  return `${fechaFormateada}`;
}
module.exports = { ingresos_usuarios_agregar,
                  ingresos_usuarios_desagregar};
