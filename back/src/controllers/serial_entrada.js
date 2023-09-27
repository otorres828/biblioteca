
module.exports = function(io) {
    var SerialPort = require("serialport");
    var axios = require('axios');
  
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Custom-Header": "Custom-Value"
    };
    const port = new SerialPort(
        'COM6',
        {baudRate: 9600}
    )
    
    const parser = new SerialPort.parsers.Readline()
    
    port.pipe(parser)
    
    parser.on('data', (data)=>{
        if (data.includes('"Card"') && data.includes('"UID"') && data.includes('"iCardCode"') && data.includes('"iSiteCode"') && data.includes('"iCode"')) {
            const tarjeta= JSON.parse(data).Card;
            console.log('TARJETA DATOS: '+tarjeta)
            axios.get(process.env.URL_API+"/control-acceso/validar-entrada/" + tarjeta.iCardCode, {headers: headers})
            .then(function(response) {
                let {estatus} = response.data;

                if(estatus==='ok')
                    port.write('ok\n')
                else
                    port.write('rj\n')

            })
            .catch(error => {
                console.error("Error al obtener al intentar valiar la tarjeta");
            });
        }
    })
  };
  