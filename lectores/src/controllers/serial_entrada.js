
module.exports = function(io) {
    var SerialPort = require("serialport");
    var axios = require('axios');
    const dotenv = require('dotenv');
    const path = require('path');
    
    dotenv.config({
      path: path.resolve(__dirname,'.env')
    });
    
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Custom-Header": "Custom-Value"
    };
    const port = new SerialPort(
        process.env.LECTOR_ENTRADA,
        {baudRate: 9600}
    )
    
    const parser = new SerialPort.parsers.Readline()
    
    port.pipe(parser)
    
    parser.on('data', (data)=>{
        console.log(data)
        if (data.includes('"Card"') && data.includes('"UID"') && data.includes('"iCardCode"') && data.includes('"iSiteCode"') && data.includes('"iCode"')) {
            const tarjeta= JSON.parse(data).Card;
            axios.get(process.env.URL_API+"/control-acceso/validar-entrada/" + tarjeta.iCardCode  + "/"+tarjeta.iSiteCode, {headers: headers})
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
  