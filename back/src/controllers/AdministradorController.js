

const Administrador = require('../models/Administrador.js');
const Permiso = require('../models/Permiso.js');
const PermisoAdministrador = require('../models/PermisoAdministrador.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'KGGK>HKHVHJVKBKJKJBKBKHKBMKHB';
const { Op } = require('sequelize');



//obtener todos los permisos
const permisos = async (req, res) => {
    const permisos = await Permiso.findAll();
    res.status(200).json(permisos);
};

//obtiene los permisos de administrador logueado
const permisos_administrador = async (req, res) => {
    //obtenemos el token del header
    const token = req.headers.authorization.split(' ')[1];
    //decodificamos el token
    const decodedToken = jwt.verify(token,SECRET_KEY);
    //obtenemos el id del administrador logueado
    const administrador_id = decodedToken.id;

    const permisos = await PermisoAdministrador.findAll({where:{administrador_id:administrador_id}});
    res.status(200).json(permisos);
};

//crea un administrador
const saltRounds = 10;

const crear_administrador = async (req, res) => {
    const {nombre_completo,nick,clave,permisos} = req.body;
    const admin = await Administrador.findOne({where:{nick: nick} });
    
    if (admin) {
        // Si encuentra el administrador, devuelve un error
        return res.status(200).json({ error: "Ya existe este el nick" });
    }
    const claveEncriptada = await bcrypt.hash(clave, saltRounds);

    var administrador = await Administrador.create({nombre_completo,nick,clave: claveEncriptada});
    
    permisos.forEach(async (permiso) => {
        await PermisoAdministrador.create({
            administrador_id: administrador.id,
            permiso_id: permiso
        });
    });
        
    res.status(200).send({mensaje:'Administrador creado con éxito',administrador});
}


//obtiene todos los administradores con sus permisos
const todos_administradores = async (req, res) => {
    const administradores = await Administrador.findAll({
      where: { principal: { [Op.ne]: 1 } },
      include: 'permisos'
    });
    res.json(administradores);
};
  
//cambiar estatus de administrador
const cambiar_estado = async (req, res) => {
    const {id} =req.params;
    try {
      const admin = await Administrador.findOne({ where: { id: id } });
  
      let nuevoEstatus;
      if (admin.estatus == 1) {
        nuevoEstatus = 2;
      } else {
        nuevoEstatus = 1;
      }
  
      await admin.update({ estatus: nuevoEstatus });
  
      res.json(nuevoEstatus === 2);
    } catch (error) {
      res.json('Error al realizar la consulta');
    }
  };
  
module.exports = {
                    permisos,
                    permisos_administrador,
                    crear_administrador,
                    todos_administradores,
                    cambiar_estado
                    };