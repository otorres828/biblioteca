

const Administrador = require('../models/Administrador.js');
const Permiso = require('../models/Permiso.js');
const PermisoAdministrador = require('../models/PermisoAdministrador.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'KGGK>HKHVHJVKBKJKJBKBKHKBMKHB';

const login = async (req, res) => {
    const {nick, clave} = req.body;

    // Consultar el modelo Administrador utilizando el nick proporcionado
    const administrador = await Administrador.findOne({where:{nick: nick} });

    if (!administrador) {
        // Si no se encuentra el administrador, devuelve un error
        return res.status(200).json({ error: "Administrador no encontrado" });
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
    
    res.status(200).json({ token_biblioteca: token,administrador:admin});
};

//compara la clave que viene del usuario con la hasheada en la bdd
const comparePassword = async (password, hash) => {
    try {
        // Comparar la clave
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.log(error);
    }

    // Devolver false si hay un error
    return false;
};

//genera el token
const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '2d' });
};
  

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


module.exports = {login,
                    permisos,
                    permisos_administrador,
                    crear_administrador
                    };