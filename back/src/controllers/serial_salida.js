
module.exports = function(io) {
    var SerialPort = require("serialport");
    var axios = require('axios');
  
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Custom-Header": "Custom-Value"
    };
    const port_salida = new SerialPort(
        'COM6',
        {baudRate: 9600}
    )
    
    const parser = new SerialPort.parsers.Readline()
    
    port_salida.pipe(parser)
    
    parser.on('data', (data)=>{
        if (data.includes('"Card"') && data.includes('"UID"') && data.includes('"iCardCode"') && data.includes('"iSiteCode"') && data.includes('"iCode"')) {
            const tarjeta= JSON.parse(data).Card;
            console.log('TARJETA DATOS: '+tarjeta)
            axios.get(process.env.URL_API+"/control-acceso/validar-salida/" + tarjeta.iCardCode, {headers: headers})
            .then(function(response) {
                let {estatus,cedula,nombre,carrera,tipo,avatar,error} = response.data;

                if(estatus==='ok')
                port_salida.write('ok\n')
                else
                port_salida.write('rj\n')

                const userInfo = {
                    estatus:estatus,
                    cedula: cedula,
                    nombre: nombre,
                    carrera: carrera,
                    tipo: tipo,
                    avatar: avatar,
                    error:error
                };
                //enviar datos del usuario al front en react con sockets
                io.emit('mensaje_salida', userInfo);
            })
            .catch(error => {
                console.error("Error al obtener al intentar valiar la tarjeta");
            });
        }
    })
  };
  