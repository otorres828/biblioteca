
module.exports = function(io) {
    var SerialPort = require("serialport");
    const dotenv = require('dotenv');
    const path = require('path');
    
    dotenv.config({
      path: path.resolve(__dirname,'.env')
    });
    
    const port = new SerialPort(
        process.env.LECTOR_PRUEBA,
        {baudRate: 9600}
    ) 
    const parser = new SerialPort.parsers.Readline()
    port.pipe(parser)
    
    parser.on('data', (data)=>{
        console.log(data)
        if (data.includes('"Card"') && data.includes('"UID"') && data.includes('"iCardCode"') && data.includes('"iSiteCode"') && data.includes('"iCode"')) {
            port.write('ok\n')
        }
    })
  };
  