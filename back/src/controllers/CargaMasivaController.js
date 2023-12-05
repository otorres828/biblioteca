const Historial = require("../models/Historial.js");
const Usuario = require("../models/Usuario.js");
const Tipo = require("../models/Tipo.js");
const Carrera = require("../models/Carrera.js");
const { Op } = require('sequelize');
const Tarjeta = require("../models/Tarjeta.js");

// Funcion para cargar datos masivamente
const carga_masiva = async (req, reply) => {
  const { registros} = req.body
  for (let i = 0; i < registros.length; i++) {
    let iCardCode = registros[i][0];
    let iSiteCode = registros[i][1];
    let codeCarnet = registros[i][2];
    let cedula = registros[i][3];
    let nombres = registros[i][4];
    let apellidos = registros[i][5];
    let correo = registros[i][6];
    let rol = registros[i][7];
    let escuela = registros[i][8];
    let foto = registros[i][9];
   
    // validamos si la cedula viene o no vacia cedula
    if(cedula!=''){
      const usuario = await Usuario.findOne({ where: {cedula} });
      let tipo= obtener_tipo(rol);
      let esc= obtener_escuela(escuela);

      if(usuario){
        //si el usuario existe, actualizamos sus datos
        await usuario.update({ correo });
        if(foto)
          await usuario.update({ avatar: foto });


        //actualizamos su tarjeta
        const ta= await Tarjeta.findOne({ where: { iCardCode,iSiteCode } });
        if(!ta && iCardCode && iSiteCode){
          await Tarjeta.create({
            iCardCode,
            iSiteCode,
            cedula,
            tipo_id:tipo,
            carrera_id:esc,
          });
        }
      }else{
        //creamos el usuario
        const u= await Usuario.create({
          cedula,
          nombres,apellidos,correo
        });

        if(u){
          //guardamos la foto
          if(foto){
            await u.update({ avatar: foto });
          }

          //creamos la tarjeta del usuario, solo si no es un visitante
          if(tipo!=5 && iCardCode && iSiteCode)
            await Tarjeta.create({
              iCardCode,
              iSiteCode,
              cedula,
              tipo_id:tipo,
              carrera_id:esc,
            });
        }
      }
    }
   }

  reply.send({mensaje:'Usuarios registrados exitosamente'})
};

const obtener_tipo=(tipo)=>{
  if(tipo=='estudiante') return 1;
  if(tipo=='profesor') return 2;
  if(tipo=='administrativo') return 3;
  if(tipo=='empleado') return 4;
  if(tipo=='visitante') return 5;
  return null;
}

const obtener_escuela=(escuela)=>{
  if(escuela=='ingenieria en informatica') return 1;
  if(escuela=='ingenieria industrial') return 2;
  if(escuela=='ingenieria civil') return 3;
  if(escuela=='derecho') return 4;
  if(escuela=='comunicacion social') return 5;
  if(escuela=='administracion de empresas') return 6;
  if(escuela=='contaduria publica') return 7;
  if(escuela=='relaciones industriales') return 8;
  return null;
}

module.exports = { carga_masiva,
                };
