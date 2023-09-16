const Historial = require("../models/Historial.js");
const Tipo = require("../models/Tipo.js");
const Usuario = require("../models/Usuario.js");
const Tarjeta = require("../models/Tarjeta.js");
const { Op } = require('sequelize');
const sequelize = require('../../config/database.js');
var axios = require('axios');
const moment = require("moment");

const Carrera = require("../models/Carrera.js");
const Abscripcion = require("../models/Abscripcion.js");
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Custom-Header": "Custom-Value"
};

const historial = async (req, res) => {
  const {fechaInicio,fechaFin} = req.body;
  const h = await Historial.findAll({
    attributes: ["id", "estatus", "fecha","tipo"],
    where: {
      fecha: {
        [Op.between]: [fechaInicio, fechaFin]
      }
    },
    include: [
      {
        model: Tarjeta,
        include: [
            {
            model: Usuario,
            attributes: ["nombres", "apellidos", "cedula"],
            required: true,
            },
            {
              model: Tipo,
              attributes: ["nombre"],
              required: false,
            },
            {
              model: Carrera,
              attributes: ["nombre"],
              required: false,
            }
          
        ]
      }
    ]
  });

  const hh = h.map(h => ({
    id: h.id,
    nombres: h.Tarjetum ? h.Tarjetum.Usuario.nombres : 'DESCONOCIDO',
    apellidos: h.Tarjetum ? h.Tarjetum.Usuario.apellidos : 'DESCONOCIDO',
    cedula: h.Tarjetum ? h.Tarjetum.Usuario.cedula.toString() : 'DESCONOCIDO',
    tipo: h.Tarjetum ? h.Tarjetum.Tipo.nombre : 'DESCONOCIDO',
    estatus: h.estatus,
    fecha: h.fecha,
    tipo_acceso: h.tipo,
    carrera: h.Tarjetum ?(h.Tarjetum.Carrera ? h.Tarjetum.Carrera.nombre : 'Visitante') :'Desconocido' 
  }));

  hh.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  res.json(hh);
};

// registra en el historial el acceso manual
const entrar_salir = async (req, res) => {
  const { cedula, tipo_acceso ,tipo_id} = req.params;
  const usuario = await Usuario.findOne( {
    where: {
      [Op.and]: [
        { cedula: cedula },
        { estatus: 1 }
      ]
    }
  });
  console.log(usuario)
  if (!usuario) {
    return res.status(200).json({ error: "El usuario no tiene permiso" });
  }

  // Obtenemos la tarjeta activa del usuario
  const query = ` SELECT t.* FROM tarjetas t, usuarios u
                  WHERE u.cedula=t.cedula
                  AND t.cedula=${cedula}
                  AND t.tipo_id=${tipo_id}
                  AND t.estatus=1
                  LIMIT 1;`;
  
  const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

  if (!result.length) {
    return res.status(200).json({ error: "El usuario no tiene tarjeta activa" });
  }

  let userInfo = {
    avatar: '',
    estatus: '',
    cedula: '',
    nombre: '',
    carrera: '',
    tipo: '',
  };

  axios.get(`${process.env.URL_API}/control-acceso/validar-${tipo_acceso}/` + result[0].iCardCode, { headers: headers })
    .then(function(response) {
    
      let { estatus, cedula, nombre, carrera, tipo, avatar } = response.data;
      userInfo.avatar = avatar;
      userInfo.estatus = estatus;
      userInfo.cedula = cedula;
      userInfo.nombre = nombre;
      userInfo.carrera = carrera;
      userInfo.tipo = tipo;

      // Accede a io a través del objeto req.app
      const { io } = req.app;

      if (tipo_acceso == 'entrada') {
        // Enviar datos del usuario al front en react con sockets
        io.emit("mensaje_entrada", userInfo);
      } else {
        // Enviar datos del usuario al front en react con sockets
        io.emit("mensaje_salida", userInfo);
      }

      res.json({ estatus: "ok" });
    })
    .catch(function(error) {
      res.status(500).send("Error en la solicitud");
    });
};

const validar_tarjeta_entrada = async (req, res) => {
  const { iCardCode } = req.params;
  //obtnemos la tarjeta
  const tarjeta = await Tarjeta.findByPk(iCardCode);

  // Obtén la fecha y hora actual
  const fechaActual = new Date();
  // Resta 4 horas a la fecha actual
  fechaActual.setHours(fechaActual.getHours());

  //validamos si la tarjeta existe
  if (!tarjeta) {
    const data = {
      fecha: fechaActual,
      estatus: "3",
      tarjeta_id: null
    };

    // Call the function to create a new record
    const existingRecord = await Historial.findOne({ where: { fecha: data.fecha } });
    if (!existingRecord) 
      await Historial.create(data);
    return res.json({ estatus: "denied" });
  }

  //obtenemos los datos relacionados a la tarjeta, como el Usuario y el Tipo de Usuario
  const tarjetaUsuario = await Tarjeta.findOne({
    where: {
      iCardCode: tarjeta.iCardCode
    },
    include: [
      {
        model: Usuario,
        attributes: ["avatar","nombres", "apellidos", "cedula"],
      },
      {
        model: Tipo,
        attributes: ["id","nombre"]
      },
      {
        model: Carrera,
        attributes: ["id","nombre"]
      },
      {
        model: Abscripcion,
        attributes: ["id","nombre"]
      }
    ]
  });
  
  if (tarjetaUsuario) { //SI LA TARJETA DEL USUARIO ES VALIDA
    const usuario = tarjetaUsuario.Usuario;
    const cedula= usuario.cedula;
    const tipo = tarjetaUsuario.Tipo ;
    const carrera = tarjetaUsuario.Carrera ;
    const abscripcion = tarjetaUsuario.Abscripcion ;

   /*OBTENER FECHA ACTUAL */
   const fec = `select NOW() as fecha`;
   const r = await sequelize.query(fec, { type: sequelize.QueryTypes.SELECT });
   var mysqlDate = r[0].fecha; // Esta es la fecha y hora que recibiste de MySQL
   var date = moment(mysqlDate);
   var fecha_actual = date.tz('America/Caracas').format('YYYY-MM-DD');
    /*FIN DE OBTENER FECHA */
    const query = `SELECT u.*
    FROM usuarios u,tarjetas t,historiales h
    WHERE h.tarjeta_id=t.iCardCode
    AND t.cedula=u.cedula
    AND u.cedula=${cedula}
    AND h.estatus=1
    AND CAST(h.fecha AS DATE) = '${fecha_actual}'
    GROUP BY u.cedula
    HAVING SUM(h.tipo = 1) > SUM( h.tipo = 2 )`;
    const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    //DATE_SUB(CURDATE(), INTERVAL 1 DAY)
    const data = {
      fecha: fechaActual,
      estatus: tarjeta.estatus,
      tipo:1,
      tarjeta_id: tarjetaUsuario.iCardCode,
      tipo_id:tipo.id,
      carrera_id:carrera ? carrera.id :null,
      abscripcion_id:abscripcion ? abscripcion.id:null,
    };

    if (result.length) { //esta adentro pero no ha salido
      data.estatus = 2;
    }

    // crea un registro en el historial
    await Historial.create(data);
    //retornamos la respuesta
    return res.json({
      estatus: data.estatus == 1 ? "ok" : (data.estatus == 3 ? "denied" : "no_passed"),
      cedula: usuario.cedula,
      nombre: usuario.nombres + ", " + usuario.apellidos,
      carrera:  tarjeta.estatus == 3 ? 'Desconocido' : (carrera ? carrera.nombre : 'Desconocido') ,
      tipo: tipo.nombre,
      avatar: usuario.avatar,
    });
  } else {
    // SI EL USUARIO NO EXISTE
    const data = {
      fecha: fechaActual,
      estatus: "3",
      tarjeta_id: null
    };

    // Registrar historial anonimo
    await Historial.create(data);
    return res.json({ estatus: "denied" });
  }
};

const validar_tarjeta_salida = async (req, res) => {
  const { iCardCode } = req.params;
  //obtnemos la tarjeta
  const tarjeta = await Tarjeta.findByPk(iCardCode);

  // Obtén la fecha y hora actual
  const fechaActual = new Date();

  // Resta 4 horas a la fecha actual
  fechaActual.setHours(fechaActual.getHours());

  //validamos si la tarjeta existe
  if (!tarjeta) {
    const data = {
      fecha: fechaActual,
      estatus: "3",
      tarjeta_id: null,
      tipo:2
    };

    // Call the function to create a new record
    const existingRecord = await Historial.findOne({ where: { fecha: data.fecha } });
    if (!existingRecord) 
      await Historial.create(data);
    return res.json({ estatus: "denied" });
  }

  //obtenemos los datos relacionados a la tarjeta, como el Usuario y el Tipo de Usuario
  const tarjetaUsuario = await Tarjeta.findOne({
    where: {
      iCardCode: tarjeta.iCardCode
    },
    include: [
      {
        model: Usuario,
        attributes: ["avatar","nombres", "apellidos", "cedula"],
      },
      {
        model: Tipo,
        attributes: ["id","nombre"]
      },
      {
        model: Carrera,
        attributes: ["id","nombre"]
      },
      {
        model: Abscripcion,
        attributes: ["id","nombre"]
      }
    ]
  });

  //obtenemos los datos relacionados
  if (tarjetaUsuario) { //SI LA TARJETA DEL USUARIO ES VALIDA
    const usuario = tarjetaUsuario.Usuario;
    const cedula= usuario.cedula;
    const tipo = tarjetaUsuario.Tipo ;
    const carrera = tarjetaUsuario.Carrera ;
    const abscripcion = tarjetaUsuario.Abscripcion ;

    /*OBTENER FECHA ACTUAL */
    const fec = `select NOW() as fecha`;
    const r = await sequelize.query(fec, { type: sequelize.QueryTypes.SELECT });
    var mysqlDate = r[0].fecha; // Esta es la fecha y hora que recibiste de MySQL
    var date = moment(mysqlDate);
    var fecha_actual = date.tz('America/Caracas').format('YYYY-MM-DD');
    /*FIN DE OBTENER FECHA */

    //validamos que no siga en el edificio
    const query = `SELECT u.*
    FROM usuarios u,tarjetas t,historiales h
    WHERE h.tarjeta_id=t.iCardCode
    AND t.cedula=u.cedula
    AND u.cedula=${cedula}
    AND h.estatus=1
    AND CAST(h.fecha AS DATE) = '${fecha_actual}'
    GROUP BY u.cedula
    HAVING SUM(h.tipo = 1) > SUM( h.tipo = 2 )`;
    const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    //DATE_SUB(CURDATE(), INTERVAL 1 DAY)

    const data = {
      fecha: fechaActual,
      estatus: tarjeta.estatus,
      tipo:2,
      tarjeta_id: tarjetaUsuario.iCardCode,
      tipo_id:tipo.id,
      carrera_id:carrera ? carrera.id :null,
      abscripcion_id:abscripcion ? abscripcion.id:null,
    };
    
    if (!result.length) {
      data.estatus = 3;
    }
  
    // crea un registro en el historial
    await Historial.create(data);
    //retornamos la respuesta
    return res.json({
      estatus: data.estatus == 1 ? "ok" : (data.estatus == 3 ? "denied" : "no_passed"),
      cedula: usuario.cedula,
      nombre: usuario.apellidos + ", " + usuario.nombres,
      carrera:  tarjeta.estatus == 3 ? 'Desconocido' : (carrera ? carrera.nombre : 'Desconocido') ,
      tipo: tipo.nombre,
      avatar: usuario.avatar,
    });
  } else {
    // Usage
    const data = {
      fecha: new Date(),
      estatus: "3",
      tarjeta_id: null,
      tipo:2
    };

    // Call the function to create a new record
    await Historial.create(data);
    return res.json({ estatus: "denied" });
  }
};

// Funcion que retorna los que estan en biblioteca usuarios,estudiantes,visitantes,empleados (para el control de acceso)
const personas_edificio = async (req, res) => {
  try {
    /*OBTENER FECHA ACTUAL */
    const fec = `select NOW() as fecha`;
    const r = await sequelize.query(fec, { type: sequelize.QueryTypes.SELECT });
    var mysqlDate = r[0].fecha; // Esta es la fecha y hora que recibiste de MySQL
    var date = moment(mysqlDate);
    var fecha_actual = date.tz('America/Caracas').format('YYYY-MM-DD');
    /*FIN DE OBTENER FECHA */
    //obtener los usuarios que estan en el edificio
    const query = `SELECT t.*, u.*, 
                      CASE WHEN t.carrera_id IS NULL THEN 'VISITANTE' 
                          ELSE c.nombre 
                          END AS carrera,
                      TIME(h.fecha) AS hora_ingreso
                  FROM tarjetas t
                  JOIN usuarios u ON t.cedula = u.cedula
                  LEFT JOIN historiales h ON h.tarjeta_id = t.iCardCode
                  LEFT JOIN carreras c ON t.carrera_id = c.id
                  WHERE h.estatus = 1
                    AND CAST(h.fecha AS DATE) = '${fecha_actual}'
                  GROUP BY t.cedula
                  HAVING SUM(h.tipo = 1) > SUM(h.tipo = 2)
                  ORDER BY(hora_ingreso) DESC
                  `
    const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    const estudiantes = result.filter(user => user.tipo_id === 1).length;
    const profesores = result.filter(user => user.tipo_id === 2).length;
    const administrativo = result.filter(user => user.tipo_id === 3).length;
    const usuarios = estudiantes+profesores+administrativo;
    const empleados = result.filter(user => user.tipo_id === 4).length;
    const visitantes = result.filter(user => user.tipo_id === 5).length;

    const responseObject = {
      Usuarios: usuarios,
      Empleados: empleados,
      Visitantes: visitantes,
      Personas:result,
    };
    res.status(200).json(responseObject);
  } catch (error) {
    console.error(error);
    res.status(200).json({ message: 'Ha ocurrido un error' });
  }
};

// Obtiene todos los usuarios que han ingresado o salido hoy
const ingresaron_salieron_hoy = async (req, res) => {
  const {tipo_acceso} = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set the time to 00:00:00
  
  const h = await Historial.findAll({
    attributes: ["id", "fecha", "estatus"],
    include: [
      {
        model: Tarjeta,
        include: [
          {
            model: Usuario,
            attributes: ["avatar","nombres", "apellidos", "cedula"],
          },
        ]
      },
      {
        model: Tipo,
        attributes: ["id","nombre"]
      },
      {
        model: Carrera,
        attributes: ["id","nombre"]
      },
      {
        model: Abscripcion,
        attributes: ["id","nombre"]
      }
    ],
    where: {
      tipo: tipo_acceso,
      fecha: {
        [Op.gt]: today
      }
    },
    order: [['fecha', 'DESC']]
  });
  res.json(h);
};

// Obtiene las estadisticas de ingreso por hora desde las 8am-5pm
const estadisticas_ingreso_hora = async (req, res) => {
  try {
    const hora = [];
    const ingresosCounts = [];

    for (let hour = 8; hour <= 17; hour++) {
      const startTime = new Date();
      startTime.setHours(hour -4, 0, 0, 0);
      const endTime = new Date();
      endTime.setHours(hour - 3, 0, 0, 0);

      const ingresosCount = await Historial.count({
        where: {
          tipo: '1',
          estatus: '1',
          fecha: {
            [Op.between]: [startTime, endTime]
          }
        }
      });

      hora.push(`${hour}-${hour + 1}`);
      ingresosCounts.push(ingresosCount);
    }

    const result = {
      hora,
      ingresosCounts
    };

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};




module.exports = {validar_tarjeta_entrada, 
                  validar_tarjeta_salida, 
                  historial, 
                  entrar_salir,
                  personas_edificio,
                  ingresaron_salieron_hoy ,
                  estadisticas_ingreso_hora,
                };
