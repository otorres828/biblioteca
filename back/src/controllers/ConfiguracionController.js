
const Configuracion = require('../models/Configuracion.js');

const primer_aspecto = async (req, res) => {
  try {
    const configuracion = await Configuracion.findOne({
      where: {
        id: 1
      }
    });

    if (configuracion) {
      if (configuracion.estatus == 1) {
        res.json(false);
      } else if (configuracion.estatus == 2) {
        res.json(true);
      } else {
        res.json('Estatus desconocido');
      }
    } else {
      res.json('No se encontró la configuración');
    }
  } catch (error) {
    console.error(error);
    res.json('Error al realizar la consulta');
  }
};

const cambiar_aspecto = async (req, res) => {
  try {
    const configuracion = await Configuracion.findOne({ where: { id: 1 } });

      let nuevoEstatus;
      if (configuracion.estatus==1) {
        nuevoEstatus = 2;
      } else {
        nuevoEstatus = 1;
      }

      Configuracion.update(
        { estatus: nuevoEstatus },
        { where: { id: 1 } }
      );
      

      res.json( nuevoEstatus == 2 ? true:false );
   
  } catch (error) {
    res.json('Error al realizar la consulta');
  }
};




module.exports = {primer_aspecto,
                cambiar_aspecto
                };
