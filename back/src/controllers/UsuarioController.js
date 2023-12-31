const Carrera = require('../models/Carrera.js');
const Tipo = require('../models/Tipo.js');
const Usuario = require('../models/Usuario.js');
const Abscripcion = require('../models/Abscripcion.js');
const Tarjeta = require('../models/Tarjeta.js');
const { Op,Sequelize } = require('sequelize');
const Historial = require('../models/Historial.js');
const sequelize = require('../../config/database.js');

//Devuelve todos los usuarios para el acceso manual
const todos_usuarios = async (req, res) => {
    const tarjetas = await Tarjeta.findAll({
        where: {
            estatus: 1 ,
            cedula: {[Op.ne]: 0} 
        },
        include: [
            {
                model: Usuario,
                required: true,
            },
            {
                model: Tipo,
                required: true,
            },
            {
                model: Carrera,
                required: false,
            }  
        ]  
    });   

    const usuariosList = tarjetas
    .filter((tarjeta) => tarjeta.cedula !== 0) // Filtrar registros con cedula diferente a 0
    .map((tarjeta) => {
        return {
          value: tarjeta.cedula,
          tipo: tarjeta.Tipo.id,
          label: `${tarjeta.Tipo.nombre.substring(0, 3)} - ${tarjeta.Usuario.cedula} : ${tarjeta.Usuario.nombres} ${tarjeta.Usuario.apellidos}`,
        };
    });

    res.json(usuariosList);
};

//Devuelve todos los usuarios (sin visitantes) para el modulo de usuarios
const usuarios = async (req, res) => {
    const usuarios = await Usuario.findAll({
        include:[
            {
                model:Tarjeta,
                where: { tipo_id: { [Op.ne]: 5 } },
                required: true,
                include:[
                    {
                        model:Tipo,
                    },
                    {
                        model:Carrera,
                    }
                ],
                attributes: {
                    include: [
                      [
                        Sequelize.literal(
                          `(SELECT COUNT(historiales.id) FROM historiales WHERE historiales.tarjeta_id = Tarjeta.iCardCode AND historiales.tipo = 1 AND historiales.estatus = 1)`
                        ),
                        'totalIngresos',
                      ],
                    ],
                  },
            }
        ],      
    });   
    res.json(usuarios);
};

//Devuelve todos los visitantes para el modulo de visitantes
const visitantes = async (req, res) => {
    const tarjetas = await Tarjeta.findAll({
        where: {
            estatus: 1 ,
            tipo_id:5
        },
        include: [
            {
                model: Usuario,
                required: true,
            },
          
        ]  
    });   
    res.json(tarjetas);
};

//Devuelve el historial de acceso de un usuario particular
const historial_usuario_particular = async (req, res) => {
    const { cedula,fechaInicio,fechaFin } = req.body;
    //buscamos el usuario dada la cedula
    const usuario = await Usuario.findOne({
        where: {
          cedula: cedula
        },
        include:[
            {
                model:Tarjeta,
                include:[
                    {
                        model:Tipo,
                    },
                    {
                        model:Carrera,
                    }
                ],
            }
        ],
    });
    //buscamos todas las tarjetas relacionadas a ese usuario
    const tarjetas = await Tarjeta.findAll({
        where: {
          cedula: usuario.cedula
        }
      });
    //dada la tarjeta buscamos el historial de cada tarjeta y lo insertamos en un array
    let historiales = [];
    for(let tarjeta of tarjetas) {
    const historial = await Historial.findAll({
        where: {
        tarjeta_id: tarjeta.iCardCode,
        fecha: {
            [Op.between]: [fechaInicio,  fechaFin ]
          },
        },
        include:[
                {
                    model: Tipo,
                    attributes: ["nombre"],                
                },
                {
                    model: Carrera,
                    attributes: ["nombre"],                
                }
            
        ],
        order: [['fecha', 'desc']]
    });
    historiales.push(...historial);
    }
    //ordenamos el array por fecha
    historiales.sort((a, b) => b.fecha - a.fecha);

    res.json({historial:historiales,usuario:usuario});   

}

//Crea un visitante
const visitante_crear = async (req,res) => {
    const { cedula,nombres,apellidos,detalles,correo,telefono } = req.body;
    const usuario = await Usuario.findByPk(cedula);
    console.log('hola mundo')
    //validamos que no este anteriormente
    if(usuario) 
        return res.json({error:'La cedula ya se encuentra registrada'});


    //le creamos una tarjeta al usuario
    let iCardCode=Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    let iSiteCode=Math.floor(Math.random() * (999 - 100 + 1)) + 100;

    //creamos el usuario
    const user = await Usuario.create({
            cedula: cedula,
            nombres: nombres,
            apellidos: apellidos,
            estatus:1,
            detalles:detalles,
            correo:correo,
            telefono:telefono,
    });

    const tarjeta = await Tarjeta.create(
        {
            cedula:cedula,
            tipo_id:5,
            estatus:1,
            iCardCode:iCardCode,
            iSiteCode:iSiteCode
        }
        ,{
            fields: ["cedula","tipo_id","estatus", "iCardCode","iSiteCode"]
        })
    if(user && tarjeta)
        return res.json({exito:'Visitante creado con exito'});
    return res.json({error:'Ha ocurrido un error inesperado'});
};

//Actualiza un visitante
const visitante_actualizar = async (req,res) => {
    const { cedula,cedula_vieja,nombres,apellidos,detalles,correo,telefono } = req.body;
    const usuario = await Usuario.findByPk(cedula);

    //validamos si la cedula es distinta a la que ya tenia
    if(cedula!==cedula_vieja){
        //validamos que no este anteriormente
        if(usuario) 
            return res.json({error:'La cedula ya se encuentra registrada'}); 
    }
    //actualizamos el usuario
    const actualizar = await Usuario.update(
        { cedula: cedula,nombres:nombres,apellidos:apellidos,detalles:detalles,correo:correo,telefono:telefono },
        { where: { cedula: cedula_vieja } }
    );  
    //no necesitamos actualizar las tarjetas, puesto que se actualizan en cascada

    if(actualizar)
        return res.json({exito:'Visitante creado con exito'});
    return res.json({error:'Ha ocurrido un error inesperado'});
};

//cambiar estatus de usuario
const cambiar_estado = async (req, res) => {
    const { cedula } = req.params;
    await Usuario.update({ estatus: sequelize.literal('CASE WHEN estatus = 1 THEN 2 ELSE 1 END') }, {
        where: { cedula }
    });
    const user = await Usuario.findByPk(cedula);
    res.json(user.estatus === 2);
};

//actualiza la informacion de un usuario telefono/detalles
const actualizar_informacion = async (req,res) => {
    const { cedula,detalles,telefono } = req.body;
    await Usuario.update({ detalles,telefono }, {
        where: { cedula }
    });
    res.json({exito:"Actualizacion exitosa"})
}

const updateUser = async (req,res) => {
    const {  user_id,password,name, last_name,type } = req.body;
    const user = await User.findOne({
        where: {
            user_id: user_id
        }
    });
    user.password = password;
    user.name = name;
    user.last_name = last_name;
    user.type = type;

    const actualizar = await User.save();
    res.json( { mensaje: "User actualizado correctamente"});
};

const insertPhoto = async (req,res) => {
    const {  user_id,photo } = req.body;
    const user = await User.findOne({
        where: {
            user_id: user_id
        }
    });
    user.photo = photo;

    const actualizar = await User.save();
    res.json( { mensaje: "Foto cargada!"});
};




module.exports = { usuarios,
                    visitantes,
                    todos_usuarios, 
                    historial_usuario_particular,
                    visitante_crear, 
                    visitante_actualizar,
                    cambiar_estado,
                    actualizar_informacion,
                    updateUser, insertPhoto };
