
module.exports = function(io) {
    var SerialPort = require("serialport");
    var axios = require('axios');
  
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Custom-Header": "Custom-Value"
    };
    const port = new SerialPort(
        'COM5',
        {baudRate: 9600}
    )
    
    const parser = new SerialPort.parsers.Readline()
    
    port.pipe(parser)
    
    parser.on('data', (data)=>{
        if (data.includes('"Card"') && data.includes('"UID"') && data.includes('"iCardCode"') && data.includes('"iSiteCode"') && data.includes('"iCode"')) {

        // const tarjeta= JSON.parse(data).Card;
        // console.log(tarjeta)
        // axios.get(process.env.URL_API+"/control-acceso/validar-entrada/" + tarjeta.iCardCode, {headers: headers})
        // .then(function(response) {
        //     let {estatus,cedula,nombre,carrera,tipo,avatar} = response.data;

        console.log(data)
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
  