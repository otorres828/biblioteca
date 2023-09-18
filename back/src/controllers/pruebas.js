
module.exports = function(io) {
    var SerialPort = require("serialport");
  
    const port = new SerialPort(
        'COM6',
        {baudRate: 9600}
    )
    
    const parser = new SerialPort.parsers.Readline()
    
    port.pipe(parser)
    
    parser.on('data', (data)=>{
        console.log(data)
        if (data.includes('"Card"') && data.includes('"UID"') && data.includes('"iCardCode"') && data.includes('"iSiteCode"') && data.includes('"iCode"')) {


        port.write('ok\n')
        //     const userInfo = {
        //         estatus:estatus,
        //         cedula: cedula,
        //         nombre: nombre,
        //         carrera: carrera,
        //         tipo: tipo,
        //         avatar: avatar,
        //     };
        //     //enviar datos del usuario al front en react con sockets
        //     io.emit('mensaje_entrada', userInfo);
        // })
        // .catch(error => {
        //     console.error("Error al obtener al intentar valiar la tarjeta");
        // });

        }
    })
  };
  